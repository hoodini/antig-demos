'use client';
import { motion } from 'framer-motion';
import { Trend } from '@/lib/data';
import { ArrowUpRight, Calendar, Activity, Zap } from 'lucide-react';
import clsx from 'clsx';

interface TrendCardProps {
    trend: Trend;
    index: number;
}

const categoryColors: Record<string, string> = {
    Model: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    Business: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    Research: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    Application: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
    Ethics: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
};

export default function TrendCard({ trend, index }: TrendCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="glass glass-hover p-6 rounded-2xl relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="text-white/50" />
            </div>

            <div className="flex items-start justify-between mb-4">
                <span className={clsx(
                    "px-3 py-1 rounded-full text-xs font-medium border",
                    categoryColors[trend.category] || categoryColors.Model
                )}>
                    {trend.category}
                </span>
                <div className="flex items-center text-xs text-gray-400 gap-1">
                    <Calendar size={12} />
                    <span>{trend.date}</span>
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {trend.title}
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                {trend.summary}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex gap-2">
                    {trend.tags.map(tag => (
                        <span key={tag} className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-1.5" title="Impact Score">
                    <Activity size={14} className="text-secondary" />
                    <span className="text-sm font-bold text-secondary">{trend.impactScore}/10</span>
                </div>
            </div>

            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl group-hover:from-primary/20 transition-all" />
        </motion.div>
    );
}
