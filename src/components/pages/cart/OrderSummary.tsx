import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Loader2,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { CartItem } from "@/types";

interface OrderSummaryProps {
  subtotal: number;
  t: any;
  items: CartItem[];
  clearCart: () => void;
  isLoading: boolean;
}

export function OrderSummary({
  subtotal,
  t,
  items,
  clearCart,
  isLoading,
}: OrderSummaryProps) {
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login?redirect=/cart");
      return;
    }

    try {
      const order = await api.orders.create(token, {
        shipping_method: "standard",
      });

      clearCart();
      alert(`${t.cart.orderCreated}${order.id}`);
      router.push("/dashboard");
    } catch (e) {
      console.error(e);
      alert(t.cart.checkoutFailed);
      setIsCheckingOut(false);
    }
  };

  const handleRequestQuote = async () => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");
    try {
      await api.quotes.create(token, {
        items: items.map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
        })),
        notes: "Generated from Web Cart",
      });
      clearCart();
      alert("Quote Request Submitted!");
      router.push("/dashboard");
    } catch (e) {
      alert("Failed to request quote.");
    }
  };

  return (
    <div className="lg:col-span-1">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-zinc-900/40 p-10 rounded-[3rem] border border-white/10 sticky top-32 backdrop-blur-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cedra-500 via-transparent to-transparent"></div>

        <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-10 font-display">
          RÉSUMÉ DU PROJET
        </h3>

        <div className="space-y-6 mb-12">
          <div className="flex justify-between items-center text-zinc-500 text-xs font-black uppercase tracking-widest">
            <span>{t.cart.subtotal}</span>
            <span className="text-white font-mono text-base">
              €{subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center text-zinc-500 text-xs font-black uppercase tracking-widest">
            <span>Livraison Pro (24h)</span>
            <span className="text-green-500">OFFERTE</span>
          </div>
          <div className="flex justify-between items-center text-zinc-500 text-xs font-black uppercase tracking-widest">
            <span>{t.cart.vat} (21%)</span>
            <span className="text-white font-mono text-base">
              €{(subtotal * 0.21).toFixed(2)}
            </span>
          </div>

          <Separator className="bg-white/5 h-0.5" />

          <div className="pt-2 flex justify-between items-baseline">
            <div className="text-xs font-black text-cedra-500 uppercase tracking-widest">
              TOTAL À RÉGLER
            </div>
            <div className="text-5xl font-black text-white italic tracking-tighter font-display leading-none">
              €{(subtotal * 1.21).toFixed(2)}
            </div>
          </div>
          <div className="text-[10px] text-zinc-600 uppercase font-black text-right tracking-widest -mt-4">
            MONTANT TTC
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            onClick={handleCheckout}
            disabled={isCheckingOut || isLoading}
            className="w-full h-18 bg-white text-black hover:bg-cedra-500 hover:text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl transition-all duration-500 flex items-center justify-center gap-3 group"
          >
            {isCheckingOut ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                VALIDER LA COMMANDE{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </Button>

          <Button
            onClick={handleRequestQuote}
            variant="ghost"
            className="w-full border border-white/5 text-zinc-400 hover:text-white hover:bg-white/5 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all"
          >
            {t.cart.requestQuote}
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4">
          <div className="flex items-center gap-4 text-zinc-600">
            <ShieldCheck size={20} className="text-cedra-500" />
            <span className="text-[9px] font-black uppercase tracking-widest leading-tight">
              Transactions cryptées <br /> en AES-256 bits
            </span>
          </div>
          <div className="flex items-center gap-4 text-zinc-600">
            <Truck size={20} className="text-cedra-500" />
            <span className="text-[9px] font-black uppercase tracking-widest leading-tight">
              Expédition certifiée <br /> sous 24 heures
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
