import React from "react";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const configs: Record<string, { icon: any; color: string }> = {
    Delivered: { icon: CheckCircle2, color: "text-green-500" },
    Shipped: { icon: Clock, color: "text-blue-400" },
    Cancelled: { icon: AlertCircle, color: "text-red-400" },
  };

  const config = configs[status] || configs["Shipped"];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest",
        config.color,
      )}
    >
      <Icon size={14} />
      <span>{status}</span>
    </div>
  );
}
