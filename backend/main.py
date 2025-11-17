from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import joblib
import pickle
from pathlib import Path
import numpy as np
from scipy import sparse
from sklearn.metrics.pairwise import cosine_similarity

BASE = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE / "backend" / "model"

# Load saved artifacts
PIPE_PATH = MODEL_DIR / "pipeline.pkl"
VECTORS_PATH = MODEL_DIR / "vectors.npz"
META_PATH = MODEL_DIR / "meta.pkl"

pipeline = joblib.load(PIPE_PATH)
tfidf_matrix = sparse.load_npz(VECTORS_PATH)
with open(META_PATH, "rb") as f:
    meta = pickle.load(f)

titles = meta.get("titles", [])
ids = meta.get("ids", [])

app = FastAPI(title="News Fake Detection + Recommendation (TFIDF + LR)")

class TextIn(BaseModel):
    text: str

class RecommendOut(BaseModel):
    id: int
    title: str
    score: float

@app.post("/predict")
def predict_text(payload: TextIn):
    text = payload.text
    proba = pipeline.predict_proba([text])[0]  # [prob_fake, prob_real] depending on label mapping
    pred = int(pipeline.predict([text])[0])
    # we used labels 0=fake, 1=real during training
    return {
        "prediction": "real" if pred == 1 else "fake",
        "label": pred,
        "probability_real": float(proba[1]),
        "probability_fake": float(proba[0])
    }

@app.get("/recommend/{article_id}", response_model=List[RecommendOut])
def recommend_by_id(article_id: int, top_k: Optional[int] = 5):
    if article_id < 0 or article_id >= tfidf_matrix.shape[0]:
        raise HTTPException(status_code=404, detail="article_id out of range")
    # compute cosine similarity row against full matrix
    query_vec = tfidf_matrix[article_id]
    sims = cosine_similarity(query_vec, tfidf_matrix).flatten()
    # get top_k excluding itself
    sims[article_id] = -1
    top_idx = sims.argsort()[::-1][:top_k]
    results = []
    for idx in top_idx:
        results.append(RecommendOut(id=int(idx), title=titles[idx] if idx < len(titles) else "", score=float(sims[idx])))
    return results

@app.get("/titles")
def list_titles(limit: int = 20):
    # return sample of titles with ids for you to test recommendation
    out = []
    for i, t in enumerate(titles[:limit]):
        out.append({"id": i, "title": t})
    return out
