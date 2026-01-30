import React from "react";

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/5 text-center flex flex-col gap-2">
      <span className="text-5xl font-black italic tracking-tighter text-cedra-500 font-display">
        {value}
      </span>
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
        {label}
      </span>
    </div>
  );
}
