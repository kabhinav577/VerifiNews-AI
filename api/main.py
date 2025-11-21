from fastapi import FastAPI
from pydantic import BaseModel
import joblib

# Load model and vectorizer
model = joblib.load("models/tfidf_logistic.pkl")
vectorizer = joblib.load("models/tfidf_vectorizer.pkl")

app = FastAPI(title="Fake News Detection API")

class NewsInput(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "Fake News Detection API Running"}

@app.post("/predict")
def predict(request: NewsInput):
    cleaned_text = request.text
    
    # Vectorize
    vect_text = vectorizer.transform([cleaned_text])
    
    # Predict
    prediction = model.predict(vect_text)[0]
    label = "REAL" if prediction == 1 else "FAKE"

    return {
        "prediction": int(prediction),
        "label": label
    }
