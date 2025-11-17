# train_model.py
import re
import os
import pickle
from pathlib import Path

import pandas as pd
import numpy as np
from scipy import sparse
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score
from sklearn.metrics.pairwise import cosine_similarity
import joblib
import nltk
from nltk.corpus import stopwords

# Ensure NLTK stopwords downloaded (first time)
nltk.download('stopwords')

BASE = Path(__file__).resolve().parent
RAW_DIR = BASE / "dataset" / "raw"
CLEAN_DIR = BASE / "dataset" / "cleaned"
BACKEND_MODEL_DIR = BASE / "backend" / "model"
CLEAN_DIR.mkdir(parents=True, exist_ok=True)
BACKEND_MODEL_DIR.mkdir(parents=True, exist_ok=True)

# -------------- 1. Load datasets --------------
fake_path = RAW_DIR / "Fake.csv"
real_path = RAW_DIR / "True.csv"

# Adjust columns reading depending on your CSV structure
# Many Kaggle fake-news datasets have columns: title, text, subject, date
df_fake = pd.read_csv(fake_path)
df_real = pd.read_csv(real_path)

# Standardize column names: ensure 'title' and 'text' exist
for df in (df_fake, df_real):
    if 'text' not in df.columns and 'content' in df.columns:
        df.rename(columns={'content': 'text'}, inplace=True)
    if 'title' not in df.columns and 'headline' in df.columns:
        df.rename(columns={'headline': 'title'}, inplace=True)

df_fake = df_fake[['title', 'text']].copy()
df_real = df_real[['title', 'text']].copy()

df_fake['label'] = 0
df_real['label'] = 1

df = pd.concat([df_fake, df_real], ignore_index=True).sample(frac=1, random_state=42).reset_index(drop=True)

# -------------- 2. Simple cleaning function --------------
stop_words = set(stopwords.words('english'))
def clean_text(text):
    if pd.isna(text):
        return ""
    text = str(text).lower()
    text = re.sub(r'http\S+|www\S+|https\S+', '', text)          # remove urls
    text = re.sub(r'[^a-z\s]', ' ', text)                       # keep letters + spaces
    tokens = text.split()
    tokens = [w for w in tokens if w not in stop_words and len(w) > 1]
    return " ".join(tokens)

print("Cleaning text...")
df['clean_text'] = df['text'].fillna('') + " " + df['title'].fillna('')
df['clean_text'] = df['clean_text'].apply(clean_text)

CLEAN_CSV = CLEAN_DIR / "clean_news.csv"
df.to_csv(CLEAN_CSV, index=False)
print(f"Saved cleaned CSV -> {CLEAN_CSV}")

# -------------- 3. Train/test split --------------
X = df['clean_text'].values
y = df['label'].values

X_train, X_test, y_train, y_test, idx_train, idx_test = train_test_split(
    X, y, df.index, test_size=0.2, random_state=42, stratify=y
)

# -------------- 4. Pipeline: TF-IDF + LogisticRegression --------------
print("Building pipeline...")
pipeline = Pipeline([
    ("tfidf", TfidfVectorizer(max_features=8000, ngram_range=(1,2))),
    ("clf", LogisticRegression(max_iter=1000, solver='liblinear'))  # liblinear is ok for binary
])

print("Training pipeline...")
pipeline.fit(X_train, y_train)

print("Evaluating...")
y_pred = pipeline.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

# -------------- 5. Save pipeline --------------
PIPE_PATH = BACKEND_MODEL_DIR / "pipeline.pkl"
joblib.dump(pipeline, PIPE_PATH)
print(f"Saved pipeline -> {PIPE_PATH}")

# -------------- 6. Build TF-IDF matrix for all articles for recommendation --------------
print("Computing TF-IDF vectors for full dataset (for recommendations)...")
tfidf = pipeline.named_steps['tfidf']
full_tfidf = tfidf.transform(df['clean_text'].values)  # sparse matrix

# Optionally save sparse matrix in .npz
VECTORS_PATH = BACKEND_MODEL_DIR / "vectors.npz"
sparse.save_npz(VECTORS_PATH, full_tfidf)
print(f"Saved TF-IDF vectors -> {VECTORS_PATH}")

# Save meta (titles, indexes)
meta = {
    "titles": df['title'].fillna("").tolist(),
    "ids": df.index.tolist(),
    "source_index_map": {int(i): int(i) for i in df.index.tolist()}  # simple identity map
}
META_PATH = BACKEND_MODEL_DIR / "meta.pkl"
with open(META_PATH, "wb") as f:
    pickle.dump(meta, f)
print(f"Saved meta -> {META_PATH}")

print("Training script finished.")
