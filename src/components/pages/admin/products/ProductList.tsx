import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Package, ExternalLink, Trash2, Loader2 } from "lucide-react";
import { Product } from "@/types";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  isDeleting: string | null;
  handleDelete: (id: string) => void;
}

export function ProductList({
  products,
  isLoading,
  isDeleting,
  handleDelete,
}: ProductListProps) {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-3xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 bg-white/[0.02]">
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">
              Product
            </th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">
              SKU
            </th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">
              Category
            </th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">
              Price
            </th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">
              Stock
            </th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40 text-right">
              Actions
            </th>
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
                        {typeof product.name === "string"
                          ? product.name
                          : (product.name as any)?.en || "Unnamed Product"}
                      </div>
                      <div className="text-[10px] text-white/20 font-mono">
                        {product.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-6 text-xs font-mono text-white/60">
                  {product.sku}
                </td>
                <td className="p-6 text-xs text-white/60">
                  <span className="px-2 py-1 bg-white/5 rounded border border-white/5 uppercase text-[9px] font-bold">
                    {product.category_id}
                  </span>
                </td>
                <td className="p-6 text-sm font-bold text-white">
                  €{product.price.toLocaleString()}
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        (product.stock || 0) > 10
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-xs font-bold text-white/60">
                      {product.stock || 0}
                    </span>
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
                      {isDeleting === product.id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
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
  );
}
