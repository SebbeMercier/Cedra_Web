"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Trash2, Package, Loader2, Search, Plus, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AdminProductsPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const user = await api.auth.me(token);
        if (user.role !== "admin") {
          router.push("/dashboard");
          return;
        }
        setIsLoadingAuth(false);
        fetchProducts();
      } catch (e) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  const fetchProducts = async (query = "") => {
    setIsLoading(true);
    try {
      const data = await api.products.search(query);
      // Handle cases where the API returns an object { products: [], ... } instead of a direct array
      const productsList = Array.isArray(data) 
        ? data 
        : (data as any).products || (data as any).items || [];
      setProducts(productsList);
    } catch (e) {
      console.error("Failed to fetch products", e);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product? This action is permanent.")) return;
    
    setIsDeleting(id);
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await api.products.delete(token, id);
      setProducts(prev => prev.filter(p => p.id !== id));
      alert("Product deleted successfully");
    } catch (e: any) {
      alert(`Failed to delete product: ${e.message}`);
    } finally {
      setIsDeleting(null);
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-cedra-500" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-cedra-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              <Package size={14} />
              <span>Inventory Management</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-outfit tracking-tighter italic uppercase text-white">
              Product <span className="text-cedra-500">Catalog</span>
            </h1>
          </div>
          <Link href="/admin/products/new">
            <Button className="bg-white text-black hover:bg-cedra-500 hover:text-white transition-all rounded-xl px-6 font-bold uppercase tracking-widest text-[10px] h-12">
              <Plus size={16} className="mr-2" /> Add New Product
            </Button>
          </Link>
        </header>

        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-cedra-500 transition-colors" size={18} />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchProducts(searchQuery)}
              placeholder="Search by SKU or Name..."
              className="bg-white/[0.02] border-white/10 pl-12 h-12 rounded-xl"
            />
          </div>
          <Button 
            onClick={() => fetchProducts(searchQuery)}
            className="bg-zinc-800 text-white hover:bg-zinc-700 h-12 px-8 rounded-xl"
          >
            Search
          </Button>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-3xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">Product</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">SKU</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">Category</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">Price</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">Stock</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {products.map((product) => (
                  <motion.tr 
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="border-b border-white/5 hover:bg-white/[0.01] transition-colors group"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-white/20">
                          <Package size={20} />
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm">
                            {typeof product.name === 'string' ? product.name : (product.name as any)?.en || 'Unnamed Product'}
                          </div>
                          <div className="text-[10px] text-white/20 font-mono">{product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-xs font-mono text-white/60">{product.sku}</td>
                    <td className="p-6 text-xs text-white/60">
                      <span className="px-2 py-1 bg-white/5 rounded border border-white/5 uppercase text-[9px] font-bold">
                        {product.category_id}
                      </span>
                    </td>
                    <td className="p-6 text-sm font-bold text-white">€{product.price.toLocaleString()}</td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${(product.stock || 0) > 10 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-xs font-bold text-white/60">{product.stock || 0}</span>
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/products/${product.id}`} target="_blank">
                          <button className="p-2 text-white/20 hover:text-white transition-colors">
                            <ExternalLink size={16} />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          disabled={isDeleting === product.id}
                          className="p-2 text-white/20 hover:text-red-500 transition-colors disabled:opacity-50"
                        >
                          {isDeleting === product.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {isLoading && (
            <div className="py-20 flex justify-center">
              <Loader2 className="animate-spin text-cedra-500" size={32} />
            </div>
          )}
          
          {!isLoading && products.length === 0 && (
            <div className="py-20 text-center text-white/20 border-t border-white/5">
              No products found in the catalog.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
