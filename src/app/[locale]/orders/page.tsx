"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n";
import { OrderHeader } from "@/components/pages/orders/OrderHeader";
import { OrderList } from "@/components/pages/orders/OrderList";
import { EmptyOrders } from "@/components/pages/orders/EmptyOrders";

const MOCK_ORDERS = [
  {
    id: "ORD-9921",
    date: "Jan 12, 2026",
    total: 4250.0,
    status: "Delivered",
    items: 3,
  },
  {
    id: "ORD-9884",
    date: "Jan 08, 2026",
    total: 1299.0,
    status: "Shipped",
    items: 1,
  },
  {
    id: "ORD-9752",
    date: "Dec 21, 2025",
    total: 849.99,
    status: "Delivered",
    items: 2,
  },
  {
    id: "ORD-9661",
    date: "Dec 15, 2025",
    total: 3450.0,
    status: "Cancelled",
    items: 5,
  },
];

export default function OrdersPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <OrderHeader t={t} />

        {MOCK_ORDERS.length > 0 ? (
          <OrderList orders={MOCK_ORDERS} t={t} />
        ) : (
          <EmptyOrders t={t} />
        )}
      </div>
    </div>
  );
}
