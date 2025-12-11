'use client';
import { Bell, Search, UserCircle } from 'lucide-react';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 glass z-50 flex items-center justify-between px-6 border-b border-white/5">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center font-bold text-white text-lg">
                    Y
                </div>
                <h1 className="font-bold text-xl tracking-tight">
                    YUV<span className="text-cyan-400">.AI</span> Trends
                </h1>
            </div>

            <div className="flex-1 max-w-xl mx-8 hidden md:block">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-violet-400 transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search trends, models, or companies..."
                        className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6 text-gray-400">
                <a href="https://yuv.ai" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center gap-2 hover:text-cyan-400 transition-colors text-xs tracking-wider uppercase font-medium">
                    <span>Built by Yuval Avidani</span>
                </a>
                <div className="h-4 w-px bg-white/10 hidden lg:block"></div>
                <button className="hover:text-white transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                </button>
                <button className="hover:text-white transition-colors">
                    <UserCircle size={24} />
                </button>
            </div>
        </header>
    );
}
