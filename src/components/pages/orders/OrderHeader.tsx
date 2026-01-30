import React from "react";
import { Search } from "lucide-react";

interface OrderHeaderProps {
  t: any;
}

export function OrderHeader({ t }: OrderHeaderProps) {
  return (
    <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
          {t.orderHistory.title}{" "}
          <span className="text-cedra-500">{t.orderHistory.titleAccent}</span>
        </h1>
        <p className="text-white/50 text-sm font-medium mt-2">
          {t.orderHistory.subtitle}
        </p>
      </div>
      <div className="relative group min-w-[300px]">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-cedra-500 transition-colors"
          size={18}
        />
        <input
          type="text"
          placeholder={t.orderHistory.searchPlaceholder}
          className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cedra-500/30 transition-all font-medium placeholder:text-white/10"
        />
      </div>
    </header>
  );
}
