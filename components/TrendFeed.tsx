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

    const filteredTrends = activeCategory === 'All'
        ? trends
        : trends.filter(t => t.category === activeCategory);

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-8">
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
                {loading && (
                    <div className="flex items-center px-4 text-sm text-gray-500 animate-pulse">
                        <span className="w-2 h-2 mr-2 bg-cyan-400 rounded-full"></span>
                        Syncing live data...
                    </div>
                )}
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence>
                    {filteredTrends.map((trend, index) => (
                        <TrendCard key={trend.id} trend={trend} index={index} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredTrends.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No trends found for this category.
                </div>
            )}
        </div>
    );
}
