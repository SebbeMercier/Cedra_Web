"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { ProductCreateForm } from "@/components/pages/admin/products/new/ProductCreateForm";

export default function CreateProductPage() {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [flattenedCategories, setFlattenedCategories] = useState<
    { id: string; label: string }[]
  >([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

        // Load categories as a tree
        const tree = await api.categories.getTree();

        // Flatten the tree for the dropdown with "Parent > Child" labels
        const flattened: { id: string; label: string }[] = [];
        const flatten = (cats: any[], prefix = "") => {
          cats.forEach((c) => {
            const currentName =
              typeof c.name === "object"
                ? c.name[locale] ||
                  c.name["fr"] ||
                  c.name["en"] ||
                  c.slug ||
                  c.id
                : c.name || c.slug || c.id;
            const label = prefix ? `${prefix} > ${currentName}` : currentName;
            flattened.push({ id: c.id, label });
            if (c.sub_categories && c.sub_categories.length > 0) {
              flatten(c.sub_categories, label);
            }
          });
        };
        flatten(tree);
        setFlattenedCategories(flattened);
        if (flattened.length > 0) setCategoryId(flattened[0].id);
      } catch (e) {
        console.error("Auth check failed", e);
        router.push("/login");
      }
    };
    checkAuth();
  }, [router, locale]);

  const handleGenerateAI = async () => {
    if (!name) return alert("Please enter a product name first.");
    setIsGenerating(true);
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    try {
      const res = await api.ai.generateDescription(token, {
        product_name: name,
        features: [sku, "high performance", "industrial"],
        tone: "professional",
        language: locale,
      });
      setDescription(res.description);
    } catch (e) {
      alert("AI Generation Failed");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!categoryId) return alert("Please select a category.");
    setIsSaving(true);
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    try {
      await api.products.create(token, {
        name: { [locale]: name },
        description: { [locale]: description },
        sku,
        price: parseFloat(price),
        cost: parseFloat(price) * 0.7,
        currency: "EUR",
        stock: 100,
        category_id: categoryId,
        image_urls: [],
        low_stock_threshold: 10,
        weight: 0,
        tags: [],
      });
      alert("Product Created!");
      router.push("/products");
    } catch (e: any) {
      alert(`Failed to create product: ${e.message}`);
    } finally {
      setIsSaving(false);
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
    <div className="min-h-screen pt-40 pb-20 px-6 bg-background">
      <ProductCreateForm
        t={t}
        name={name}
        setName={setName}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        flattenedCategories={flattenedCategories}
        sku={sku}
        setSku={setSku}
        price={price}
        setPrice={setPrice}
        description={description}
        setDescription={setDescription}
        isGenerating={isGenerating}
        handleGenerateAI={handleGenerateAI}
        isSaving={isSaving}
        handleSave={handleSave}
      />
    </div>
  );
}
