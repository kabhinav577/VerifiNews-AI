import { fetchCategorizedNews } from '../actions/newsActions';
import { fetchLiveCricketMatches } from '../actions/cricbuzzActions';
import FeedList from './FeedList';
import LiveCricket from '../components/LiveCricket';

export const metadata = {
  title: 'Live News Feed - VerifiNews-AI',
  description: 'Top headlines from around the world curated by GNews.',
};

export default async function FeedPage() {
  const articles = await fetchCategorizedNews('general', 1);
  const cricketData = await fetchLiveCricketMatches();

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          {/* Left Sidebar - Live Cricket */}
          <aside className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0 lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:pr-2 no-scrollbar">
            <LiveCricket matches={cricketData.matches} />
          </aside>

          {/* Main Feed Content */}
          <div className="flex-1 w-full min-w-0">
            <div className="text-center mb-12 lg:mt-2">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 tracking-tight dark:from-slate-100 dark:to-slate-300">
                Verify the news stream.
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-4 text-base sm:text-lg max-w-xl mx-auto font-medium leading-relaxed">
                Our AI analyzes millions of data points to determine credibility in real-time.
              </p>
            </div>
            <FeedList initialArticles={articles} />
          </div>
        </div>
      </div>
    </div>
  );
}
