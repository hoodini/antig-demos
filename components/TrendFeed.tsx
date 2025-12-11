'use client';
import { useState, useEffect } from 'react';
import { Trend } from '@/lib/data';
import TrendCard from './TrendCard';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const categories = ['All', 'Model', 'Business', 'Research', 'Application', 'Ethics'];

interface TrendFeedProps {
    initialTrends: Trend[];
}

export default function TrendFeed({ initialTrends }: TrendFeedProps) {
    const [trends, setTrends] = useState<Trend[]>(initialTrends);
    const [activeCategory, setActiveCategory] = useState('All');
    const [dateRange, setDateRange] = useState<'24H' | '7D' | '30D' | 'All'>('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                const res = await fetch('/api/trends');
                const data = await res.json();
                if (data.trends) {
                    setTrends(data.trends);
                }
            } catch (error) {
                console.error("Failed to fetch trends", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrends();
    }, []);

    const filterByDate = (trend: Trend) => {
        if (dateRange === 'All') return true;

        const trendDate = new Date(trend.date);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - trendDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (dateRange === '24H') return diffDays <= 1;
        if (dateRange === '7D') return diffDays <= 7;
        if (dateRange === '30D') return diffDays <= 30;
        return true;
    };

    const filteredTrends = trends
        .filter(t => activeCategory === 'All' || t.category === activeCategory)
        .filter(filterByDate);

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={clsx(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                                activeCategory === cat
                                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                    : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:border-white/20"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Date Filters */}
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
                    {(['24H', '7D', '30D', 'All'] as const).map(range => (
                        <button
                            key={range}
                            onClick={() => setDateRange(range)}
                            className={clsx(
                                "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors",
                                dateRange === range
                                    ? "bg-violet-600 text-white"
                                    : "text-gray-400 hover:text-white"
                            )}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {loading && (
                <div className="flex items-center justify-center py-4 mb-4 text-sm text-gray-500 animate-pulse">
                    <span className="w-2 h-2 mr-2 bg-cyan-400 rounded-full"></span>
                    Syncing live intelligence...
                </div>
            )}

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence mode='popLayout'>
                    {filteredTrends.map((trend, index) => (
                        <TrendCard key={trend.id} trend={trend} index={index} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredTrends.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No trends found for this filter.
                </div>
            )}
        </div>
    );
}
