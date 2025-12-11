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

import { RefreshCw } from 'lucide-react';

export default function TrendFeed({ initialTrends }: TrendFeedProps) {
    const [trends, setTrends] = useState<Trend[]>(initialTrends);
    const [activeCategory, setActiveCategory] = useState('All');
    const [dateRange, setDateRange] = useState<'24H' | '7D' | '30D' | 'All' | 'Custom'>('All');
    const [loading, setLoading] = useState(false);
    const [customDays, setCustomDays] = useState(60); // Default custom days

    const fetchTrends = async () => {
        setLoading(true);
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

    useEffect(() => {
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
        if (dateRange === 'Custom') return diffDays <= customDays;
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

                <div className="flex items-center gap-4">
                    {/* Refresh Button */}
                    <button
                        onClick={fetchTrends}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
                        title="Refresh Data"
                    >
                        <RefreshCw size={16} className={clsx(loading && "animate-spin")} />
                    </button>

                    {/* Date Filters */}
                    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
                        {(['24H', '7D', '30D', 'All', 'Custom'] as const).map(range => (
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
            </div>

            {dateRange === 'Custom' && (
                <div className="flex justify-end mb-4">
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg">
                        <span className="text-xs text-gray-400">Last</span>
                        <input
                            type="number"
                            value={customDays}
                            onChange={(e) => setCustomDays(Number(e.target.value))}
                            className="bg-transparent border-b border-white/20 w-12 text-center text-sm font-bold text-white focus:outline-none focus:border-violet-500"
                        />
                        <span className="text-xs text-gray-400">days</span>
                    </div>
                </div>
            )}

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
