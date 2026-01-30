"use client";

import React, { memo } from "react";
import Image from "next/image";
import { ShoppingCart, Eye, Star, Box, CheckCircle2, ShoppingBag, TrendingDown, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    category: string;
    sku?: string;
    stock?: number;
    image?: string;
}

const ProductCard = memo(function ProductCard({ id, name, price, category, sku, stock, image }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart({
            id,
            name,
            price,
            description: "",
            sku: sku || `SKU-CD-${id}`,
            currency: "EUR",
            category_id: category,
            inventory_count: stock || 100,
            images: image ? [image] : []
        });
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-zinc-900/40 backdrop-blur-xl rounded-[2rem] border border-white/5 hover:border-cedra-500/50 transition-all duration-500 flex flex-col overflow-hidden shadow-2xl hover:cedra-shadow"
        >
            {/* Link to detail */}
            <Link href={`/products/${id}`} className="absolute inset-0 z-10" />

            {/* Product Image Area */}
            <div className="aspect-square bg-zinc-950/50 relative overflow-hidden flex items-center justify-center p-10">
                <div className="absolute top-4 left-4 z-20">
                   <Badge className="bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest text-zinc-400">
                     {category}
                   </Badge>
                </div>
                
                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-contain transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/5 gap-2 group-hover:text-cedra-500/20 transition-colors">
                        <ShoppingBag size={80} strokeWidth={1} />
                    </div>
                )}

                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="p-3 bg-white text-black rounded-xl hover:bg-cedra-500 hover:text-white transition-all shadow-xl">
                        <Eye size={16} />
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-6 pt-2 flex flex-col flex-1 relative z-20">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-tighter">
                       {sku || `SKU-CD-${id.slice(0,6)}`}
                    </span>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-[9px] font-black text-green-500/80 uppercase tracking-widest">In Stock</span>
                    </div>
                </div>

                <h3 className="text-lg font-black text-white italic uppercase tracking-tighter line-clamp-2 leading-none mb-4 group-hover:text-cedra-500 transition-colors font-display">
                    {name}
                </h3>

                <div className="mt-auto">
                    <div className="flex items-end justify-between mb-6">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">Prix Pro</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-white italic tracking-tighter font-display">
                                    €{price.toFixed(2)}
                                </span>
                                <span className="text-[9px] text-zinc-500 font-bold uppercase ml-1">HTVA</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 px-2 py-1 bg-cedra-500/10 rounded-lg border border-cedra-500/20 shadow-[0_0_15px_rgba(230,0,35,0.1)]">
                            <TrendingDown size={12} className="text-cedra-500" />
                            <span className="text-[9px] font-black text-cedra-500 uppercase tracking-tighter">AI Optimized</span>
                        </div>
                    </div>

                    <button
                        className="w-full bg-white text-black hover:bg-cedra-500 hover:text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 relative z-20 flex items-center justify-center gap-2 group/btn shadow-xl hover:shadow-cedra-500/20"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart size={16} />
                        Ajouter au projet
                    </button>
                </div>
            </div>
        </motion.div>
    );
});

export default ProductCard;