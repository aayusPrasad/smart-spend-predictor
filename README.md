SmartSpend Predictor 💳🤖
Project Overview

SmartSpend Predictor is an AI-powered expense classification and budget monitoring system that automatically predicts the category of a financial transaction based on natural language input and alerts users when spending approaches or exceeds category-specific limits.

The goal of the project is to simplify personal finance tracking by combining machine learning with an interactive web dashboard.
What the project does ⚙️

Users enter:

expense description
transaction amount


The system then:

✅ predicts expense category using trained ML model
✅ returns confidence score
✅ checks spending against predefined monthly category limits
✅ shows overspending warning if threshold is crossed
✅ stores prediction history
✅ provides spending summary dashboard

Core Features 🔥
AI-based expense category prediction
Overspending alert system
Transaction history tracking
Budget category monitoring
Interactive dashboard UI
Fast API-based backend serving predictions
Cloud deployment support

Tech Stack 🛠️
Frontend
React
TypeScript
Tailwind CSS
Vite
Backend
FastAPI
Uvicorn
Machine Learning
scikit-learn
TF-IDF vectorization
Logistic Regression classifier
Deployment
Hugging Face (backend deployment)
GitHub (source control)

ML Pipeline 🧠

The model is trained on transaction descriptions using:

Text → TF-IDF Vectorizer → Logistic Regression → Category Prediction

Supported categories include:

food
shopping
travel
utilities
entertainment
education
healthcare
investment
emi

Future Plans 🚀

Planned upgrades include:

✅ real-time live spending analytics
✅ monthly downloadable reports
✅ user authentication
✅ multi-user expense tracking
✅ bank statement auto parsing
✅ OCR receipt scanning
✅ anomaly/fraud expense detection
✅ personalized AI financial suggestions
✅ deep learning upgrade using transformer-based expense understanding
