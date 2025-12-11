'use client';
import { Bell, Search, UserCircle, Twitter, Instagram, Youtube, Linkedin, Link as LinkIcon, Star, CloudLightning } from 'lucide-react';
import Link from 'next/link';

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
                <div className="hidden lg:flex flex-col items-end gap-1">
                    <span className="text-[10px] font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent uppercase tracking-wider">GitHub Star</span>
                    <span className="text-[10px] font-bold bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent uppercase tracking-wider">AWS Gen AI Superstar</span>
                </div>

                <div className="flex items-center gap-3 border-l border-white/10 pl-6">
                    <Link href="https://github.com/hoodini" target="_blank" className="hover:text-white transition-colors"><Star size={18} /></Link>
                    <Link href="https://x.com/yuvalav" target="_blank" className="hover:text-white transition-colors"><Twitter size={18} /></Link>
                    <Link href="https://instagram.com/yuval_770" target="_blank" className="hover:text-white transition-colors"><Instagram size={18} /></Link>
                    <Link href="https://youtube.com/@yuv-ai" target="_blank" className="hover:text-white transition-colors"><Youtube size={18} /></Link>
                    <Link href="https://linkedin.com/in/%F0%9F%8E%97%EF%B8%8Fyuval-avidani-87081474" target="_blank" className="hover:text-white transition-colors"><Linkedin size={18} /></Link>
                    <Link href="https://linktr.ee/yuvai" target="_blank" className="hover:text-white transition-colors"><LinkIcon size={18} /></Link>
                    <Link href="https://yuv.ai" target="_blank" className="hover:text-white transition-colors"><CloudLightning size={18} /></Link>
                </div>

                <div className="h-4 w-px bg-white/10 hidden lg:block"></div>
                <button className="hover:text-white transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                </button>
            </div>
        </header>
    );
}
