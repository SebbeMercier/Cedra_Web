"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { ProductHeader } from "@/components/pages/admin/products/ProductHeader";
import { ProductList } from "@/components/pages/admin/products/ProductList";

export default function AdminProductsPage() {
  const router = useRouter();
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const user = await api.auth.me(token);
        if (user.role !== "admin") {
          router.push("/dashboard");
          return;
        }
        setIsLoadingAuth(false);
        fetchProducts();
      } catch (e) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  const fetchProducts = async (query = "") => {
    setIsLoading(true);
    try {
      const data = await api.products.search(query);
      const productsList = Array.isArray(data)
        ? data
        : (data as any).products || (data as any).items || [];
      setProducts(productsList);
    } catch (e) {
      console.error("Failed to fetch products", e);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this product? This action is permanent.",
      )
    )
      return;

    setIsDeleting(id);
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await api.products.delete(token, id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert("Product deleted successfully");
    } catch (e: any) {
      alert(`Failed to delete product: ${e.message}`);
    } finally {
      setIsDeleting(null);
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-cedra-500" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <ProductHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          fetchProducts={fetchProducts}
        />
        <ProductList
          products={products}
          isLoading={isLoading}
          isDeleting={isDeleting}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}