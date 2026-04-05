from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import json
import os

app = FastAPI(title="SmartSpend AI Backend")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Safe path handling
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "expense_pipeline.pkl")
LIMITS_PATH = os.path.join(BASE_DIR, "model", "limits.json")

# Load ML model
with open(MODEL_PATH, "rb") as f:
    pipeline = pickle.load(f)

# Load limits
with open(LIMITS_PATH, "r") as f:
    limits = json.load(f)

# Monthly spending tracker
spent = {
    "food": 2800,
    "travel": 2000,
    "shopping": 4500,
    "utilities": 3000,
    "entertainment": 2400,
    "education": 4000,
    "healthcare": 2000,
    "investment": 6000,
    "emi": 10000
}

# Prediction history
history = []


# Input schema
class ExpenseInput(BaseModel):
    text: str
    amount: float


# Warning logic
def spending_alert(category):
    ratio = spent.get(category, 0) / limits.get(category, 1)

    if ratio >= 1:
        return "🚨 Limit exceeded"
    elif ratio >= 0.8:
        return "⚠ Near monthly limit"
    else:
        return "✅ Safe"


# Home route
@app.get("/")
def home():
    return {
        "message": "SmartSpend AI Backend Running"
    }


# Predict route
@app.post("/predict")
def predict_expense(data: ExpenseInput):
    pred = pipeline.predict([data.text])[0]
    prob = pipeline.predict_proba([data.text]).max()

    pred = pred.lower()

    if pred in spent:
        spent[pred] += data.amount

    warning = spending_alert(pred)

    entry = {
        "text": data.text,
        "amount": data.amount,
        "category": pred,
        "confidence": round(prob * 100, 2),
        "warning": warning
    }

    history.append(entry)

    return {
        "category": pred,
        "confidence": round(prob * 100, 2),
        "warning": warning,
        "message": f"This expense belongs to {pred}"
    }


# Summary route
@app.get("/summary")
def get_summary():
    return {
        "spent": spent,
        "limits": limits
    }


# History route
@app.get("/history")
def get_history():
    return {
        "history": history
    }


# Reset route
@app.post("/reset")
def reset_history():
    history.clear()
    return {
        "message": "History reset successful"
    }
