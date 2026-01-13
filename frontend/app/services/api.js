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
