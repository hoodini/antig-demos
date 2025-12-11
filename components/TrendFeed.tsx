'use client';
import { useState } from 'react';
import { Trend } from '@/lib/data';
import TrendCard from './TrendCard';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const categories = ['All', 'Model', 'Business', 'Research', 'Application', 'Ethics'];

interface TrendFeedProps {
    initialTrends: Trend[];
}

export default function TrendFeed({ initialTrends }: TrendFeedProps) {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredTrends = activeCategory === 'All'
        ? initialTrends
        : initialTrends.filter(t => t.category === activeCategory);

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
