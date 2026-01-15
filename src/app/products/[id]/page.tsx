"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart, Star, ShieldCheck, Truck, RotateCcw, Zap, TrendingDown } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
    const { id } = useParams();
    const { addToCart } = useCart();

    // Mock product data
    const product = {
        id: id as string,
        name: "3-Phase Power Breaker - 400V Industrial Grade",
        price: 189.50,
        category: "Protection",
        sku: "CD-BKR-3P-400-X",
        description: "High-performance circuit protection designed for heavy industrial workloads. Fully compatible with high-concurrency power distribution clusters.",
        features: [
            "Sovereign hardware verification",
            "ScyllaDB inventory tracked",
            "Peppol invoicing ready",
            "FastHTTP API integration available"
        ],
        specs: {
            voltage: "400V",
            current: "63A",
            poles: "3-Phase",
            standard: "IEC 60898-1"
        }
    };

    return (
        <div className="min-h-screen pt-40 pb-20 bg-black">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-zinc-950 rounded-[3rem] border border-white/5 flex items-center justify-center p-20 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-red-600/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="text-white/5 uppercase font-black text-4xl tracking-tighter opacity-10 select-none">Technical Part</div>
                            {/* Visual Placeholder */}
                            <div className="absolute inset-x-0 bottom-12 flex justify-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div>
                                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                            </div>
                        </div>
                    </div>

                    {/* Product Actions */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-3 py-1 bg-zinc-900 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-red-600">
                                {product.category}
                            </span>
                            <span className="text-white/20 font-mono text-[10px] uppercase tracking-widest">
                                {product.sku}
                            </span>
                        </div>

                        <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-6 leading-[0.9]">
                            Professional <br />
                            <span className="text-red-500">{product.name}</span>
                        </h1>

                        <div className="flex items-center gap-2 mb-8">
                            <div className="flex text-red-600">
                                {[1, 2, 3, 4].map(i => <Star key={i} size={16} fill="currentColor" />)}
                                <Star size={16} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">12 Verified Reviews</span>
                        </div>

                        <div className="bg-zinc-950 p-8 rounded-[2.5rem] border border-white/5 mb-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 blur-2xl rounded-full"></div>

                            <div className="flex items-end justify-between mb-8">
                                <div>
                                    <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Trade Unit Price</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black text-white tracking-tighter">€{product.price.toFixed(2)}</span>
                                        <span className="text-sm font-black text-white/20 uppercase">Ex. VAT</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-2 text-green-500 font-black text-[10px] uppercase tracking-widest mb-1">
                                        <TrendingDown size={14} /> AI Optimum Price
                                    </div>
                                    <span className="text-[10px] font-bold text-white/20">Updated 4m ago</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    size="lg"
                                    className="flex-1 rounded-[1.5rem]"
                                    onClick={() => addToCart({ ...product, description: "" })}
                                >
                                    Add to Catalog
                                </Button>
                                <Button variant="outline" size="lg" className="w-20 rounded-[1.5rem] p-0">
                                    <ShieldCheck size={24} />
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Benefit icon={<Truck />} text="Next Day Dispatch" />
                            <Benefit icon={<RotateCcw />} text="14-Day Returns" />
                        </div>
                    </div>
                </div>

                {/* Technical Details Tabs (Shadcn UI) */}
                <div className="max-w-4xl mx-auto">
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="w-full justify-start overflow-x-auto no-scrollbar">
                            <TabsTrigger value="description">Description</TabsTrigger>
                            <TabsTrigger value="specs">Specifications</TabsTrigger>
                            <TabsTrigger value="shipping">Logistics</TabsTrigger>
                        </TabsList>

                        <TabsContent value="description" className="bg-zinc-950/50 p-10 rounded-[2.5rem] border border-white/5 min-h-[300px]">
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-6">Technical Overview</h3>
                            <p className="text-white/50 text-lg leading-relaxed mb-8">
                                {product.description}
                            </p>
                            <ul className="space-y-4">
                                {product.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-white/80">
                                        <Zap className="text-red-500" size={16} /> {f}
                                    </li>
                                ))}
                            </ul>
                        </TabsContent>

                        <TabsContent value="specs" className="bg-zinc-950/50 p-10 rounded-[2.5rem] border border-white/5 min-h-[300px]">
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-8 text-center">Data Sheet</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                {Object.entries(product.specs).map(([label, value]) => (
                                    <div key={label} className="flex items-center justify-between py-4 border-b border-white/5">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{label}</span>
                                        <span className="text-sm font-bold text-white uppercase">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="shipping" className="bg-zinc-950/50 p-10 rounded-[2.5rem] border border-white/5 min-h-[300px]">
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 p-6 bg-red-600/5 rounded-2xl border border-red-600/20">
                                    <Truck className="text-red-600" size={32} />
                                    <div>
                                        <h4 className="font-black text-white uppercase italic text-sm tracking-widest">Global Supply Chain</h4>
                                        <p className="text-xs text-white/40 font-bold uppercase mt-1">Real-time tracking via ScyllaDB logistics node.</p>
                                    </div>
                                </div>

                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Delivery Schedule</AccordionTrigger>
                                        <AccordionContent>
                                            Orders placed before 17:00 CET are dispatched same-day from our central hub. Delivery typically takes 24-48 hours.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>Tax & Export</AccordionTrigger>
                                        <AccordionContent>
                                            All prices listed reflect B2B trade units excluding VAT. International orders will be processed via Peppol e-invoicing.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

function Benefit({ icon, text }: { icon: any, text: string }) {
    return (
        <div className="flex items-center gap-3 p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
            <div className="text-red-600">{icon}</div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{text}</span>
        </div>
    );
}
