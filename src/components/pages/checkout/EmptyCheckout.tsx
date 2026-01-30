import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/layout/PageHeader";

interface EmptyCheckoutProps {
  t: any;
}

export function EmptyCheckout({ t }: EmptyCheckoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <PageHeader title={t.cart.title} titleAccent="Checkout" />
      <div className="mt-12">
        <p className="text-zinc-500 text-xl mb-8">{t.cart.empty}</p>
        <Link href="/products">
          <Button className="bg-white text-black hover:bg-cedra-500 hover:text-white px-8 h-14 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl">
            {t.cart.browseCatalog}
          </Button>
        </Link>
      </div>
    </div>
  );
}
