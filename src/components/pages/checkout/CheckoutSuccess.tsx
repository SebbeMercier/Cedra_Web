import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CheckoutSuccessProps {
  orderId: string;
  t: any;
}

export function CheckoutSuccess({ orderId, t }: CheckoutSuccessProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8">
        <CheckCircle2 className="w-12 h-12 text-green-500" />
      </div>
      <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-4">
        {t.cart.orderCreated}
      </h1>
      <p className="text-zinc-500 text-xl mb-12 max-w-md italic font-medium">
        {t.cart.orderCreated}{" "}
        <span className="text-cedra-500 font-black">#{orderId}</span>
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/orders">
          <Button className="bg-white text-black hover:bg-cedra-500 hover:text-white px-8 h-14 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl">
            {t.hero.trackOrder}
          </Button>
        </Link>
        <Link href="/">
          <Button
            variant="outline"
            className="border-white/10 text-white hover:bg-white/5 px-8 h-14 rounded-2xl font-black uppercase tracking-widest transition-all"
          >
            {t.nav.home}
          </Button>
        </Link>
      </div>
    </div>
  );
}
