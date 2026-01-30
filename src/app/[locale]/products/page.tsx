import React, { Suspense } from "react";
import ProductsContent from "@/components/pages/products/ProductsContent";
import { Loader2 } from "lucide-react";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-cedra-500">
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}