import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, Package, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Order } from "@/types";

interface RecentOrdersProps {
  orders: Order[];
  t: any;
}

export function RecentOrders({ orders, t }: RecentOrdersProps) {
  const router = useRouter();

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter flex items-center gap-4 font-display">
          <div className="w-1.5 h-8 bg-cedra-500 rounded-full"></div>
          {t.dashboard.recentOrders || "Commandes Récentes"}
        </h3>
        <Link
          href="/orders"
          className="text-[11px] font-black text-zinc-500 hover:text-white uppercase tracking-[0.2em] transition-all flex items-center gap-2"
        >
          Tout voir <ChevronRight size={14} />
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="bg-zinc-900/20 rounded-[2.5rem] border border-white/5 p-20 text-center backdrop-blur-3xl shadow-2xl">
          <Package className="mx-auto mb-6 text-zinc-800" size={64} />
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">
            Aucune commande pour le moment
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.slice(0, 5).map((order) => (
            <motion.div
              key={order.id}
              whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.03)" }}
              className="bg-zinc-900/20 border border-white/5 rounded-2xl p-6 flex items-center justify-between gap-6 transition-all cursor-pointer group hover:border-cedra-500/30"
              onClick={() => router.push(`/orders/${order.id}`)}
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-zinc-950/50 rounded-xl flex items-center justify-center text-zinc-600 font-black border border-white/5 group-hover:border-cedra-500/20 group-hover:text-cedra-500 transition-all">
                  #{order.id.slice(-4).toUpperCase()}
                </div>
                <div>
                  <div className="text-white font-black uppercase italic tracking-tighter font-display text-lg mb-1">
                    Commande {order.id.slice(0, 8)}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-zinc-500 uppercase font-black tracking-widest">
                    <Clock size={12} />
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-10">
                <div className="text-right hidden sm:block">
                  <div className="text-2xl font-black text-white italic tracking-tighter font-display">
                    €{order.total_amount?.toLocaleString()}
                  </div>
                  <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                    MONTANT TOTAL
                  </div>
                </div>
                <Badge
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border-none shadow-lg",
                    order.status === "delivered"
                      ? "bg-green-500/20 text-green-500"
                      : "bg-cedra-500 text-white",
                  )}
                >
                  {order.status}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
