from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# Initialize globally
analyzer = SentimentIntensityAnalyzer()

def analyze_sentiment(text: str) -> dict:
    """
    Analyzes the sentiment of a given text and returns the score and label.
    """
    if not text or not text.strip():
        return {
            "score": 0.0,
            "label": "Neutral"
        }
    
    scores = analyzer.polarity_scores(text)
    compound_score = scores['compound']
    
    if compound_score >= 0.05:
        label = "Positive"
    elif compound_score <= -0.05:
        label = "Negative"
    else:
        label = "Neutral"
        
    return {
        "score": round(compound_score, 2),
        "label": label
    }
