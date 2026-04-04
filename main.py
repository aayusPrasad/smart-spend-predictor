from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import json

app = FastAPI(title="SmartSpend AI Backend")

# CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load ML model
with open("model/expense_pipeline.pkl", "rb") as f:
    pipeline = pickle.load(f)

# Load spending limits
with open("model/limits.json", "r") as f:
    limits = json.load(f)

# Dummy monthly spending tracker
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
    ratio = spent[category] / limits[category]

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

    # Update spending
    if pred in spent:
        spent[pred] += data.amount

    warning = spending_alert(pred)

    # Save history
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


# Spending summary route
@app.get("/summary")
def get_summary():
    return {
        "spent": spent,
        "limits": limits
    }


# Prediction history route
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