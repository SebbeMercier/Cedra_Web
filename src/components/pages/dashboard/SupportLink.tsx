import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SupportLinkProps {
  icon: React.ReactNode;
  label: string;
}

export function SupportLink({ icon, label }: SupportLinkProps) {
  return (
    <Link
      href="#"
      className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5 hover:border-cedra-500/30 transition-all group"
    >
      <div className="flex items-center gap-3">
        <span className="text-zinc-600 group-hover:text-cedra-500 transition-colors">
          {icon}
        </span>
        <span className="text-[10px] font-black text-zinc-400 group-hover:text-white uppercase tracking-widest transition-colors">
          {label}
        </span>
      </div>
      <ChevronRight
        size={14}
        className="text-zinc-800 group-hover:text-cedra-500 transition-all"
      />
    </Link>
  );
}
