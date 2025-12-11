'use client';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Brain, Globe } from 'lucide-react';

const stats = [
    { label: 'New Models', value: '3', icon: Brain, color: 'text-violet-400' },
    { label: 'Major Events', value: '5', icon: Globe, color: 'text-blue-400' },
    { label: 'Impact Score', value: '9.2', icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'Weekly Hype', value: 'High', icon: Zap, color: 'text-amber-400' },
];

export default function WeeklyStats() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, i) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-4 rounded-2xl flex items-center gap-4"
                >
                    <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                        <stat.icon size={24} />
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">{stat.label}</p>
                        <p className="text-2xl font-bold text-white text-glow">{stat.value}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
