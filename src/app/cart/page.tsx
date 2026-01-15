"use client";

import React from "react";
import { useCart } from "@/hooks/useCart";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, subtotal, itemCount } = useCart();

    if (itemCount === 0) {
        return (
            <div className="min-h-screen pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
                    <ShoppingBag size={40} className="text-white/20" />
                </div>
                <h1 className="text-4xl font-bold font-outfit mb-4">Your cart is empty</h1>
                <p className="text-white/50 mb-10 max-w-sm">
                    Looks like you haven't added any solutions to your enterprise suite yet.
                </p>
                <Link
                    href="/products"
                    className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all"
                >
                    Browse Catalog
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-40 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-12">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center gap-6"
                            >
                                <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                                    <ShoppingBag size={32} className="text-white/20" />
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                                    <p className="text-white/40 text-sm mb-4">{item.category}</p>

                                    <div className="flex items-center justify-center sm:justify-start space-x-4">
                                        <div className="flex items-center bg-white/5 rounded-lg border border-white/10 px-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-2 hover:text-brand-orange transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center font-bold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-2 hover:text-brand-orange transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-white/40 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="text-2xl font-bold text-white">€{(item.price * item.quantity).toFixed(2)}</div>
                                    <div className="text-xs text-white/40 font-bold uppercase tracking-widest mt-1">Excl. VAT</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="glass p-8 rounded-3xl border border-white/10 sticky top-32">
                            <h2 className="text-2xl font-bold mb-8">Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-white/60">
                                    <span>Subtotal</span>
                                    <span>€{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white/60">
                                    <span>Estimated VAT (21%)</span>
                                    <span>€{(subtotal * 0.21).toFixed(2)}</span>
                                </div>
                                <hr className="border-white/10" />
                                <div className="flex justify-between text-2xl font-bold">
                                    <span>Total</span>
                                    <span className="text-brand-orange">€{(subtotal * 1.21).toFixed(2)}</span>
                                </div>
                            </div>

                            <button className="w-full py-5 bg-white text-black font-extrabold rounded-2xl hover:bg-white/90 transition-all flex items-center justify-center space-x-2 group mb-4">
                                <span>Checkout Securely</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="text-[10px] text-center text-white/30 uppercase tracking-widest font-bold">
                                Tax calculated based on company location
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
