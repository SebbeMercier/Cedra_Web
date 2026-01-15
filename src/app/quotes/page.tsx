"use client";

import React from "react";
import { ListChecks, Send, Calculator, ArrowRight, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_QUOTES = [
    { id: "QT-2026-004", title: "Data Center Expansion Phase 2", date: "Jan 14, 2026", amount: 12450.00, status: "Awaiting Approval" },
    { id: "QT-2026-001", title: "AI Training Cluster Hardware", date: "Jan 03, 2026", amount: 8900.00, status: "Converted to Order" },
];

export default function QuotesPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight mb-2">Quotes & Tenders</h1>
                        <p className="text-white/50">Manage your custom enterprise quotes and price requests.</p>
                    </div>
                    <button className="px-6 py-3 bg-brand-orange text-white rounded-xl font-bold hover:bg-brand-orange/90 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,102,0,0.3)] shrink-0">
                        <Plus size={18} />
                        <span>Request New Quote</span>
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main List */}
                    <div className="lg:col-span-2 space-y-4">
                        {MOCK_QUOTES.map((quote, index) => (
                            <motion.div
                                key={quote.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass p-6 rounded-3xl border border-white/10 hover:border-brand-orange/30 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{quote.id}</span>
                                        <h3 className="text-xl font-bold mt-1 group-hover:text-brand-orange transition-colors">{quote.title}</h3>
                                    </div>
                                    <div className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest bg-white/5 border border-white/10 ${quote.status === 'Converted to Order' ? 'text-green-500' : 'text-brand-orange'}`}>
                                        {quote.status}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex gap-8">
                                        <div>
                                            <div className="text-[10px] uppercase font-bold text-white/20">Requested On</div>
                                            <div className="text-sm font-bold text-white/70">{quote.date}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] uppercase font-bold text-white/20">Est. Total</div>
                                            <div className="text-sm font-bold text-white">€{quote.amount.toFixed(2)}</div>
                                        </div>
                                    </div>
                                    <button className="text-white/40 hover:text-white transition-colors">
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Helper / Info Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="glass p-8 rounded-3xl border border-white/10">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-orange mb-6">
                                <Calculator size={24} />
                            </div>
                            <h2 className="text-xl font-bold mb-4">How quotes work</h2>
                            <p className="text-white/40 text-sm leading-relaxed mb-6">
                                Submit a configuration or list of parts. Our automated engine (Sovereign AI) or a sales representative will review and provide the best enterprise pricing within 2 hours.
                            </p>
                            <ul className="space-y-3">
                                <QuoteStep icon={<ListChecks size={16} />} text="Build your configuration" />
                                <QuoteStep icon={<Send size={16} />} text="Submit for review" />
                                <QuoteStep icon={<ArrowRight size={16} />} text="Convert to order" />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function QuoteStep({ icon, text }: { icon: any, text: string }) {
    return (
        <li className="flex items-center gap-3 text-white/50 text-xs font-bold">
            <span className="text-brand-orange">{icon}</span>
            {text}
        </li>
    );
}
