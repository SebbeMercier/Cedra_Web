import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyCartProps {
  t: any;
}

export function EmptyCart({ t }: EmptyCartProps) {
  return (
    <div className="min-h-screen pt-40 px-6 bg-background flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cedra-500/5 blur-[120px] rounded-full pointer-events-none -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -ml-32 -mb-32"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10"
      >
        <div className="w-24 h-24 bg-zinc-900/40 backdrop-blur-3xl rounded-3xl flex items-center justify-center text-zinc-700 mb-8 border border-white/5 mx-auto">
          <Lock size={40} strokeWidth={1} />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-4 font-display">
          {t.cart.empty}
        </h1>
        <p className="text-zinc-500 mb-10 max-w-sm mx-auto font-black uppercase text-[11px] tracking-[0.3em] leading-relaxed">
          Votre inventaire de projet est actuellement vide. Explorez notre
          catalogue pour commencer.
        </p>
        <Link href="/products">
          <Button className="bg-white text-black hover:bg-cedra-500 hover:text-white px-10 h-16 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl">
            {t.cart.browseCatalog}
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
