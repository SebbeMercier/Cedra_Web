"use client";

import React, { useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import { Search, Filter, SlidersHorizontal, ChevronDown, LayoutGrid, List, Camera } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_PRODUCTS = [
    { id: "1", name: "Enterprise Scylla Node - XL", price: 2499.00, category: "Hardware", stock: 12, sku: "HW-SCY-XL-01" },
    { id: "2", name: "High-Speed Fiber Switch 48pt", price: 849.99, category: "Hardware", stock: 45, sku: "HW-FIB-48-99" },
    { id: "3", name: "AI Inference Accelerator v2", price: 1299.00, category: "Components", stock: 8, sku: "AI-ACC-V2-B" },
    { id: "4", name: "Sovereign Cloud API Key", price: 49.00, category: "License", stock: 999, sku: "SW-API-SOV-01" },
    { id: "5", name: "Rack-Mount Cooling Unit", price: 1450.0, category: "Infrastructure", stock: 15, sku: "INF-CLK-RM" },
    { id: "6", name: "Data Sovereignty Suite", price: 750.0, category: "Software", stock: 100, sku: "SW-SOV-SUITE" },
    { id: "7", name: "Ollama Local Gateway", price: 1200.0, category: "AI Tools", stock: 23, sku: "AI-GTW-OL-1" },
    { id: "8", name: "B2B Procurement Dashboard", price: 450.0, category: "Software", stock: 50, sku: "SW-PRC-DASH" },
];

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const categories = ["All", "Hardware", "Software", "Components", "License", "Infrastructure", "AI Tools"];

    const filteredProducts = MOCK_PRODUCTS.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight mb-2">Corporate Inventory</h1>
                        <p className="text-white/50">Manage and procure high-performance solutions for your enterprise.</p>
                    </div>
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white/10 text-white" : "text-white/30 hover:text-white"}`}
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white/10 text-white" : "text-white/30 hover:text-white"}`}
                        >
                            <List size={18} />
                        </button>
                    </div>
                </header>

                {/* Inventory Control Bar */}
                <div className="flex flex-col lg:flex-row gap-4 mb-10">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-brand-orange transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search by Product Name, SKU or ID..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-14 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/30 transition-all font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/20 hover:text-brand-orange transition-colors">
                            <Camera size={20} />
                        </button>
                    </div>

                    <div className="flex gap-4">
                        <div className="relative group min-w-[160px]">
                            <button className="w-full h-full px-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between text-white/70 hover:text-white transition-all font-bold text-sm">
                                <div className="flex items-center gap-2">
                                    <Filter size={16} />
                                    <span>{selectedCategory}</span>
                                </div>
                                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                            </button>
                            <div className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl border border-white/10 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30 shadow-2xl">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat ? "bg-brand-orange/20 text-brand-orange font-bold" : "hover:bg-white/5 text-white/60"}`}
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button className="px-6 bg-white/5 border border-white/10 rounded-2xl flex items-center space-x-3 text-white/70 hover:text-white transition-all font-bold text-sm">
                            <SlidersHorizontal size={16} />
                            <span>Sort Specs</span>
                        </button>
                    </div>
                </div>

                {/* Results Counter */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="text-sm text-white/40 font-bold uppercase tracking-widest">
                        Found {filteredProducts.length} items in Catalog
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/30">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Inventory Sync: Real-time
                    </div>
                </div>

                {/* Product Grid - Functional cards */}
                <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}>
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                        >
                            <ProductCard {...product} />
                        </motion.div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-32 text-center glass rounded-[3rem] border border-dashed border-white/10">
                        <Search className="mx-auto mb-6 text-white/10" size={64} />
                        <h3 className="text-2xl font-bold mb-2">Item not found in inventory</h3>
                        <p className="text-white/40 max-w-sm mx-auto">No results matching "{searchQuery}". Check the SKU or try a more general term.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                            className="mt-8 text-brand-orange font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
