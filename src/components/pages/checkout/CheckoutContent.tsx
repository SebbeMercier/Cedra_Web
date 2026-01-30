"use client";

import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useTranslation } from "@/lib/i18n";
import PageHeader from "@/components/layout/PageHeader";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { CheckoutSuccess } from "@/components/pages/checkout/CheckoutSuccess";
import { EmptyCheckout } from "@/components/pages/checkout/EmptyCheckout";
import { ShippingSection } from "@/components/pages/checkout/ShippingSection";
import { PaymentSection } from "@/components/pages/checkout/PaymentSection";
import { OrderSummary } from "@/components/pages/checkout/OrderSummary";

export default function CheckoutContent() {
  const { items, subtotal, clearCart } = useCart();
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Handle guest checkout or redirect to login
        router.push("/login?redirect=/checkout");
        return;
      }

      const order = await api.orders.create(token, {});
      setOrderId(order.id);
      setCompleted(true);
      clearCart();
    } catch (error) {
      console.error("Checkout failed:", error);
      alert(t.cart.checkoutFailed);
    } finally {
      setLoading(false);
    }
  };

  if (completed) {
    return <CheckoutSuccess orderId={orderId} t={t} />;
  }

  if (items.length === 0) {
    return <EmptyCheckout t={t} />;
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <PageHeader
        title={t.cart.title}
        titleAccent="Checkout"
        subtitle="Finalizez votre commande B2B sécurisée"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-cedra-500 transition-colors mb-8 font-black uppercase tracking-widest text-[10px]"
        >
          <ArrowLeft size={14} />
          {t.common.back} {t.cart.title}
        </Link>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Form Left */}
          <div className="lg:col-span-7 space-y-12">
            <ShippingSection />
            <PaymentSection />
          </div>

          {/* Sidebar Right */}
          <OrderSummary items={items} subtotal={subtotal} loading={loading} />
        </form>
      </div>
    </div>
  );
}
