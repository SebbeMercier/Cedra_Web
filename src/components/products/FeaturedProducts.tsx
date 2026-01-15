"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { ArrowRight, Inbox, Clock } from "lucide-react";
import Link from "next/link";

const RECENT_INVENTORY = [
    { id: "1", name: "Enterprise Scylla Node - XL", price: 2499.00, category: "Hardware", image: "" },
    { id: "2", name: "High-Speed Fiber Switch 48pt", price: 849.99, category: "Hardware", image: "" },
    { id: "3", name: "AI Inference Accelerator v2", price: 1299.00, category: "Components", image: "" },
    { id: "4", name: "Sovereign Cloud API Key", price: 49.00, category: "License", image: "" },
];

export default function FeaturedProducts() {
    return (
        <section className="py-24 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-widest">
                            <Clock size={14} />
                            <span>Just Added to Inventory</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-outfit tracking-tighter">
                            Active <span className="text-white/40">Catalog</span>
                        </h2>
                    </div>
                    <Link href="/products" className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl flex items-center space-x-2 text-white font-bold hover:bg-white/10 transition-all group">
                        <span>Access Full Inventory</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {RECENT_INVENTORY.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProductCard {...product} />
                        </motion.div>
                    ))}
                </div>

                {/* B2B Utility Banner */}
                <div className="mt-16 glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-16 h-16 bg-brand-orange/20 rounded-2xl flex items-center justify-center text-brand-orange shrink-0">
                        <Inbox size={32} />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2">Need a custom quote?</h3>
                        <p className="text-white/50">Our procurement team can help you with bulk orders and specific technical requirements.</p>
                    </div>
                    <button className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all shrink-0">
                        Request Enterprise Quote
                    </button>
                </div>
            </div>
        </section>
    );
}
