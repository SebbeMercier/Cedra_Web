import React from "react";
import { ArrowUpRight } from "lucide-react";

interface StatBoxProps {
  icon: any;
  label: string;
  value: string;
  trend: "up" | "down" | "stable";
}

export function StatBox({ icon, label, value, trend }: StatBoxProps) {
  return (
    <div className="bg-white/[0.02] backdrop-blur-3xl p-8 rounded-3xl border border-white/10 hover:border-cedra-500/30 transition-all group shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white/5 rounded-2xl text-cedra-500 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div
          className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${
            trend === "up"
              ? "text-green-500"
              : trend === "down"
                ? "text-red-500"
                : "text-white/20"
          }`}
        >
          {trend === "up" && <ArrowUpRight size={12} />}
          {trend}
        </div>
      </div>
      <div className="text-3xl font-black text-white tracking-tighter mb-1">
        {value}
      </div>
      <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
        {label}
      </div>
    </div>
  );
}
