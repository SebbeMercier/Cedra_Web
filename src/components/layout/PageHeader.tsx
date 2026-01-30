import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  titleAccent?: string;
  subtitle?: string;
  className?: string;
}

export default function PageHeader({
  title,
  titleAccent,
  subtitle,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("relative py-12 md:py-20 overflow-hidden", className)}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cedra-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cedra-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter font-display leading-none">
            {title} <span className="text-cedra-500">{titleAccent}</span>
          </h1>
          {subtitle && (
            <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
