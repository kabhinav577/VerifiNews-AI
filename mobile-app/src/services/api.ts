const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.254.68.6:8000';

export const predictNews = async (text: string, model: string = 'distilbert') => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        model: model,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || `HTTP error ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.warn(`Backend prediction server is unreachable at ${API_BASE_URL}. Using local classification engine fallback.`);
    throw error;
  }
};

export const predictNewsUrl = async (url: string, model: string = 'distilbert') => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        model: model,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || `HTTP error ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.warn(`Backend URL prediction server is unreachable at ${API_BASE_URL}. Using local classification engine fallback.`);
    throw error;
  }
};
