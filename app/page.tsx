import Header from '@/components/Header';
import WeeklyStats from '@/components/WeeklyStats';
import TrendFeed from '@/components/TrendFeed'; // Import the new client component
import { trends } from '@/lib/data';
import { Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      <Header />

      <div className="pt-32 px-6 max-w-7xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
            <Sparkles size={12} />
            <span>THE AI SOURCE OF TRUTH</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
              The AI Pulse.
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Decoded for Leaders.
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed md:mx-0 mx-auto">
            The definitive platform for tracking the latest breakthroughs, business moves, and technical leaps in Artificial Intelligence.
            Curated for executives, developers, and enthusiasts who need to stay ahead of the curve.
          </p>
        </div>

        <WeeklyStats />

        <TrendFeed initialTrends={trends} />
      </div>

      <footer className="mt-20 border-t border-white/5 py-10 text-center text-gray-600 text-sm">
        <div className="flex justify-center gap-4 mb-4">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          System Operational
        </div>
        <p>© 2025 YUV.AI Trends. Internal Executive Briefing.</p>
      </footer>
    </main>
  );
}
