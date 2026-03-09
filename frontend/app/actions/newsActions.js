'use server';

export async function fetchCategorizedNews(category = 'general', page = 1, lang = 'en') {
  const GNEWS_API_KEY = process.env.GNEWS_API_KEY;
  const GNEWS_BASE_URL = 'https://gnews.io/api/v4';
  const MAX_PER_PAGE = 10;
  
  if (!GNEWS_API_KEY) {
    console.error('GNEWS_API_KEY is missing');
    return [];
  }

  // If Hindi is selected, prioritize Indian news sources
  const countryParam = lang === 'hi' ? '&country=in' : '&country=us';

  try {
    const res = await fetch(
      `${GNEWS_BASE_URL}/top-headlines?category=${category}&lang=${lang}${countryParam}&max=${MAX_PER_PAGE}&page=${page}&apikey=${GNEWS_API_KEY}`,
      { 
        // Adding cache control so we don't spam the API unnecessarily 
        // but still get relatively fresh data (revalidate every hour)
        next: { revalidate: 3600 } 
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status}`);
    }

    const data = await res.json();
    return data.articles || [];
  } catch (error) {
    console.error(`Error fetching news for category ${category}:`, error);
    return [];
  }
}
