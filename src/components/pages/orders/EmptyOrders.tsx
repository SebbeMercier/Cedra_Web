import React from "react";
import { FileText } from "lucide-react";

interface EmptyOrdersProps {
  t: any;
}

export function EmptyOrders({ t }: EmptyOrdersProps) {
  return (
    <div className="py-32 text-center bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10 backdrop-blur-3xl">
      <FileText className="mx-auto mb-6 text-white/10" size={64} />
      <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">
        {t.orderHistory.noOrders}
      </h3>
      <p className="text-white/40 text-sm font-medium">
        {t.orderHistory.noOrdersDesc}
      </p>
    </div>
  );
}
