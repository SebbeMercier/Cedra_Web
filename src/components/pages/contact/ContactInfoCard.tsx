import React from "react";

interface ContactInfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  desc: string;
}

export function ContactInfoCard({
  icon,
  title,
  value,
  desc,
}: ContactInfoCardProps) {
  return (
    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-cedra-500/30 transition-all group">
      <div className="w-12 h-12 bg-cedra-500/10 rounded-2xl flex items-center justify-center text-cedra-500 mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">
        {title}
      </h4>
      <p className="text-white font-black italic uppercase tracking-tighter mb-1">
        {value}
      </p>
      <p className="text-[10px] font-medium text-zinc-600 uppercase tracking-widest">
        {desc}
      </p>
    </div>
  );
}
