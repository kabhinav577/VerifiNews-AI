import pandas as pd
import requests

df = pd.read_csv("../dataset/test_news_articles.csv")

for _, row in df.iterrows():
    # 1. Get the full text
    full_text = str(row["article_text"])
    
    # 2. Split into words, take the first 20, and join them back
    words = full_text.split()
    short_text = " ".join(words[:20]) + "..." # Added '...' for a preview look
    
    response = requests.post(
        "http://127.0.0.1:8000/predict",
        json={
            "text": full_text,
            "model": "distilbert"
        }
    )
    
    # 3. Print the shortened version
    print(f"Text Preview: {short_text} -> {response.json()}")


# import pandas as pd
# import requests

# df = pd.read_csv("../dataset/test_news_titles.csv")

# for _, row in df.iterrows():
#     response = requests.post(
#         "http://127.0.0.1:8000/predict",
#         json={
#             "text": row["title_text"],
#             "model": "distilbert"
#         }
#     )
#     print(row["title_text"], "->", response.json())
#     response = requests.post(
#         "http://127.0.0.1:8000/predict",
#         json={
#             "text": row["title_text"],
#             "model": "tfidf_gb"
#         }
#     )
#     print(row["title_text"], "->", response.json())
#     print("----------------------------------------------------")