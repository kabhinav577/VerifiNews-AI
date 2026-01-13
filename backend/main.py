from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import joblib
import re

from transformers import (
    DistilBertTokenizerFast,
    DistilBertForSequenceClassification,
    MobileBertTokenizerFast,
    MobileBertForSequenceClassification
)

# ==================================================
# FastAPI App Initialization
# ==================================================
app = FastAPI(
    title="VERIFINEWS-AI Backend",
    description="Fake News Detection using DistilBERT, MobileBERT, and TF-IDF + Gradient Boosting",
    version="1.0"
)

# ==================================================
# CORS Middleware Configuration
# ==================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ==================================================
# Text Cleaning (MATCHES DATA CLEANING NOTEBOOK)
# ==================================================
def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-zA-Z ]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

# ==================================================
# Load TF-IDF + Gradient Boosting Pipeline
# ==================================================
try:
    tfidf_gb_pipeline = joblib.load("../models/tfidf_gb_pipeline.pkl")
    TFIDF_GB_AVAILABLE = True
except Exception:
    TFIDF_GB_AVAILABLE = False

# ==================================================
# Load DistilBERT
# ==================================================
distil_tokenizer = DistilBertTokenizerFast.from_pretrained(
    "../models/distilbert_fake_news"
)

distil_model = DistilBertForSequenceClassification.from_pretrained(
    "../models/distilbert_fake_news"
).to(DEVICE)
distil_model.eval()

# ==================================================
# Load MobileBERT
# ==================================================
mobile_tokenizer = MobileBertTokenizerFast.from_pretrained(
    "../models/mobilebert_fake_news"
)

mobile_model = MobileBertForSequenceClassification.from_pretrained(
    "../models/mobilebert_fake_news"
).to(DEVICE)
mobile_model.eval()

# ==================================================
# Request Schema
# ==================================================
class PredictionRequest(BaseModel):
    text: str
    model: str  # distilbert | mobilebert | tfidf_gb

# ==================================================
# Prediction Functions
# ==================================================
def predict_distilbert(text: str):
    cleaned = clean_text(text)

    inputs = distil_tokenizer(
        cleaned,
        return_tensors="pt",
        truncation=True,
        padding=True
    ).to(DEVICE)

    with torch.no_grad():
        outputs = distil_model(**inputs)
        probs = torch.softmax(outputs.logits, dim=1)

    label = torch.argmax(probs).item()
    confidence = probs.max().item()
    return label, confidence


def predict_mobilebert(text: str):
    cleaned = clean_text(text)

    inputs = mobile_tokenizer(
        cleaned,
        return_tensors="pt",
        truncation=True,
        padding=True
    ).to(DEVICE)

    with torch.no_grad():
        outputs = mobile_model(**inputs)
        probs = torch.softmax(outputs.logits, dim=1)

    label = torch.argmax(probs).item()
    confidence = probs.max().item()
    return label, confidence


def predict_tfidf_gb(text: str):
    if not TFIDF_GB_AVAILABLE:
        return None, None

    cleaned = clean_text(text)
    label = tfidf_gb_pipeline.predict([cleaned])[0]
    confidence = max(tfidf_gb_pipeline.predict_proba([cleaned])[0])
    return int(label), float(confidence)

# ==================================================
# API Routes
# ==================================================
@app.get("/")
def root():
    return {
        "status": "VERIFINEWS-AI backend running",
        "models_available": ["distilbert", "mobilebert", "tfidf_gb"],
        "label_mapping": {
            "0": "Fake News",
            "1": "Real News"
        }
    }


@app.post("/predict")
def predict(request: PredictionRequest):

    if request.model == "distilbert":
        label, conf = predict_distilbert(request.text)

    elif request.model == "mobilebert":
        label, conf = predict_mobilebert(request.text)

    elif request.model == "tfidf_gb":
        label, conf = predict_tfidf_gb(request.text)
        if label is None:
            return {
                "model_used": "tfidf_gb",
                "error": "TF-IDF + Gradient Boosting model not available"
            }

    else:
        return {
            "error": "Invalid model. Use: distilbert | mobilebert | tfidf_gb"
        }

    # IMPORTANT: Label interpretation matches cleaning notebook
    return {
        "model_used": request.model,
        "prediction": "Real News" if label == 1 else "Fake News",
        "confidence": round(conf, 4)
    }
