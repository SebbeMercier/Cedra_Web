"use client";

import React from "react";
import { FileText, ChevronRight, Clock, CheckCircle2, AlertCircle, Search, Download } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_ORDERS = [
    { id: "ORD-9921", date: "Jan 12, 2026", total: 4250.00, status: "Delivered", items: 3 },
    { id: "ORD-9884", date: "Jan 08, 2026", total: 1299.00, status: "Shipped", items: 1 },
    { id: "ORD-9752", date: "Dec 21, 2025", total: 849.99, status: "Delivered", items: 2 },
    { id: "ORD-9661", date: "Dec 15, 2025", total: 3450.00, status: "Cancelled", items: 5 },
];

export default function OrdersPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight mb-2">Order History</h1>
                        <p className="text-white/50">Track your corporate procurement and download invoices.</p>
                    </div>
                    <div className="relative group min-w-[300px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input
                            type="text"
                            placeholder="Search by Order ID..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/30 transition-all"
                        />
                    </div>
                </header>

                {/* Orders Table-like view */}
                <div className="space-y-4">
                    {MOCK_ORDERS.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center gap-6 hover:bg-white/5 transition-colors group cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/30 group-hover:text-brand-orange transition-colors shrink-0">
                                <FileText size={20} />
                            </div>

                            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                                <div>
                                    <div className="text-[10px] uppercase font-bold text-white/20 mb-1">Order ID</div>
                                    <div className="font-mono font-bold text-white">{order.id}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase font-bold text-white/20 mb-1">Date</div>
                                    <div className="font-bold text-white/80">{order.date}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase font-bold text-white/20 mb-1">Total</div>
                                    <div className="font-bold text-white">€{order.total.toFixed(2)}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase font-bold text-white/20 mb-1">Status</div>
                                    <StatusBadge status={order.status} />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 shrink-0 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/5 justify-between">
                                <button className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-bold">
                                    <Download size={16} />
                                    <span>Invoice</span>
                                </button>
                                <div className="text-white/20 group-hover:text-white transition-colors">
                                    <ChevronRight size={20} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {MOCK_ORDERS.length === 0 && (
                    <div className="py-20 text-center glass rounded-3xl border border-dashed border-white/10">
                        <h3 className="text-2xl font-bold mb-2">No orders found</h3>
                        <p className="text-white/40 text-sm">You haven't placed any orders yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const configs: Record<string, { icon: any, color: string }> = {
        "Delivered": { icon: CheckCircle2, color: "text-green-500" },
        "Shipped": { icon: Clock, color: "text-blue-400" },
        "Cancelled": { icon: AlertCircle, color: "text-red-400" },
    };

    const config = configs[status] || configs["Shipped"];
    const Icon = config.icon;

    return (
        <div className={`flex items-center gap-1.5 ${config.color} text-xs font-bold`}>
            <Icon size={14} />
            <span>{status}</span>
        </div>
    );
}
