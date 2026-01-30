import React from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProductHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fetchProducts: (query: string) => void;
}

export function ProductHeader({
  searchQuery,
  setSearchQuery,
  fetchProducts,
}: ProductHeaderProps) {
  return (
    <>
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
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-cedra-500 transition-colors"
            size={18}
          />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchProducts(searchQuery)}
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
    </>
  );
}
