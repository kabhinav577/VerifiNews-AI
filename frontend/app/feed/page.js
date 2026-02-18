import { getTopHeadlines } from '../services/api';
import FeedList from './FeedList';

export const metadata = {
  title: 'Live News Feed - VerifiNews-AI',
  description: 'Top headlines from around the world curated by GNews.',
};

export default async function FeedPage() {
  const articles = await getTopHeadlines();

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Verify the news stream.</h1>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Our AI analyzes millions of data points to determine credibility in real-time.
          </p>
        </div>

        <FeedList initialArticles={articles} />
      </div>
    </div>
  );
}
