"use client";

import React, { useState } from "react";
import { Search, Camera, ChevronRight, Zap, Lightbulb, Shield, Hammer, Cable, Radio, Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import VisualSearchModal from "@/components/ui/VisualSearchModal";

export default function Hero() {
    const [query, setQuery] = useState("");
    const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/products?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <section className="bg-black pt-24 pb-8 px-6 border-b border-white/5 relative overflow-hidden">
            <VisualSearchModal isOpen={isVisualSearchOpen} onClose={() => setIsVisualSearchOpen(false)} />
            {/* Red Ambient Glows */}
            <div className="absolute top-0 right-0 w-[40%] h-full bg-red-600/5 blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1500px] mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 items-center mb-8">
                    {/* Main Search Experience */}
                    <div className="flex-1 w-full">
                        <h1 className="text-white text-3xl font-black mb-6 tracking-tighter uppercase italic">
                            Professional <span className="text-red-600">Electrical</span> Inventory
                        </h1>

                        <form onSubmit={handleSearch} className="flex group shadow-2xl shadow-red-600/5">
                            <div className="flex-1 relative flex items-center bg-zinc-900 rounded-l border-y border-l border-white/10 overflow-hidden group-focus-within:border-red-600/50 transition-all">
                                <div className="px-4 py-4 bg-zinc-800 border-r border-white/10 text-white/50 text-xs font-black uppercase tracking-widest flex items-center gap-1 cursor-pointer hover:bg-zinc-700 transition-colors">
                                    All <ChevronRight size={14} />
                                </div>
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Enter SKU, Part Number or Description..."
                                    className="w-full py-4 px-4 bg-transparent text-white text-lg focus:outline-none placeholder:text-zinc-700 font-medium"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsVisualSearchOpen(true)}
                                    className="p-3 text-white/20 hover:text-red-600 transition-colors"
                                >
                                    <Camera size={18} />
                                </button>
                                <button
                                    type="button"
                                    className="p-3 text-white/20 hover:text-red-600 transition-colors"
                                >
                                    <Mic size={18} />
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="bg-red-600 text-white px-10 py-4 rounded-r hover:bg-red-700 transition-all font-black uppercase tracking-widest shadow-lg flex items-center gap-2"
                            >
                                <Search size={22} strokeWidth={3} />
                            </button>
                        </form>
                    </div>

                    <div className="hidden lg:flex flex-col gap-4 w-72">
                        <div className="bg-zinc-900/50 p-6 rounded border border-white/10 border-l-4 border-l-red-600">
                            <span className="text-white font-black uppercase text-xs tracking-widest block mb-2">Trade Priority</span>
                            <p className="text-white/40 text-[10px] mb-4 font-bold leading-relaxed">Account holders get 24h dispatch and tiered pricing.</p>
                            <button className="w-full py-2.5 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded transition-all hover:bg-red-600 hover:text-white">
                                Log In
                            </button>
                        </div>
                    </div>
                </div>

                {/* Categories Bar */}
                <div className="flex items-center gap-6 overflow-x-auto pb-4 no-scrollbar border-t border-white/5 pt-6">
                    <CategoryBtn icon={<Zap size={16} />} label="Protection" />
                    <CategoryBtn icon={<Cable size={16} />} label="Cable" />
                    <CategoryBtn icon={<Lightbulb size={16} />} label="Lighting" />
                    <CategoryBtn icon={<Radio size={16} />} label="Sockets" />
                    <CategoryBtn icon={<Hammer size={16} />} label="Tools" />
                    <CategoryBtn icon={<Shield size={16} />} label="Safety" />
                </div>
            </div>
        </section>
    );
}

function CategoryBtn({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <button className="flex items-center gap-2 text-white/40 hover:text-red-500 transition-all whitespace-nowrap group">
            <span className="p-2 bg-zinc-900 rounded group-hover:bg-red-600/10 group-hover:text-red-600 transition-all">{icon}</span>
            <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
        </button>
    );
}
