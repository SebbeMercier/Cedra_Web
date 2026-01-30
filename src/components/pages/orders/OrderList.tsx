import React from "react";
import { motion } from "framer-motion";
import { FileText, ChevronRight, Download } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: number;
}

interface OrderListProps {
  orders: Order[];
  t: any;
}

export function OrderList({ orders, t }: OrderListProps) {
  return (
    <div className="space-y-4">
      {orders.map((order, index) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white/[0.02] p-6 rounded-[2rem] border border-white/5 flex flex-col md:flex-row items-center gap-6 hover:bg-white/5 transition-all group cursor-pointer backdrop-blur-3xl"
        >
          <div className="w-14 h-14 bg-cedra-500/10 rounded-2xl flex items-center justify-center text-cedra-500 group-hover:scale-110 transition-transform shrink-0 border border-cedra-500/20">
            <FileText size={24} />
          </div>

          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <div>
              <div className="text-[9px] uppercase font-black text-white/20 mb-1 tracking-widest">
                {t.orderHistory.orderId}
              </div>
              <div className="font-mono font-bold text-white tracking-tight">
                {order.id}
              </div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-white/20 mb-1 tracking-widest">
                {t.orderHistory.date}
              </div>
              <div className="font-bold text-white/80">{order.date}</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-white/20 mb-1 tracking-widest">
                {t.orderHistory.total}
              </div>
              <div className="font-black text-white text-lg italic">
                €{order.total.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-white/20 mb-1 tracking-widest">
                {t.orderHistory.status}
              </div>
              <StatusBadge status={order.status} />
            </div>
          </div>

          <div className="flex items-center gap-6 shrink-0 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/5 justify-between">
            <button className="flex items-center gap-2 text-white/40 hover:text-cedra-500 transition-colors text-[10px] font-black uppercase tracking-[0.2em]">
              <Download size={16} />
              <span>{t.orderHistory.invoice}</span>
            </button>
            <div className="text-white/20 group-hover:text-cedra-500 transition-colors">
              <ChevronRight size={24} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
