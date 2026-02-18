import axios from 'axios';

// Backend API base URL
const API_BASE_URL = 'http://127.0.0.1:8000';

/**
 * Sends a prediction request to the backend API
 * @param {string} text - The full news article text
 * @param {string} model - The model to use: 'distilbert', 'mobilebert', or 'tfidf_gb'
 * @returns {Promise<Object>} Response containing prediction, model_used, and confidence
 */
export const predictNews = async (text, model) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, {
      text: text,
      model: model,
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(
      error.response?.data?.detail || 
      'Failed to connect to the backend. Please ensure the server is running at http://127.0.0.1:8000'
    );
  }
};

// GNews API Configuration
const GNEWS_API_KEY = process.env.GNEWS_API_KEY;
const GNEWS_BASE_URL = 'https://gnews.io/api/v4';

/**
 * Fetches top headlines from GNews
 * @returns {Promise<Array>} List of articles
 */
export const getTopHeadlines = async () => {
  if (!GNEWS_API_KEY) {
    console.error('GNEWS_API_KEY is missing');
    return [];
  }

  try {
    const res = await fetch(
      `${GNEWS_BASE_URL}/top-headlines?category=general&lang=en&max=20&apikey=${GNEWS_API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status}`);
    }

    const data = await res.json();
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

/**
 * Fetches a single article by searching for its title
 * @param {string} title - The title of the article to search for
 * @returns {Promise<Object|null>} The article object or null
 */
export const getArticleByTitle = async (title) => {
  if (!GNEWS_API_KEY) return null;

  try {
    const encodedTitle = encodeURIComponent(title);
    const res = await fetch(
      `${GNEWS_BASE_URL}/search?q="${encodedTitle}"&lang=en&max=1&apikey=${GNEWS_API_KEY}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch article');
    }

    const data = await res.json();
    return data.articles?.[0] || null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
};
