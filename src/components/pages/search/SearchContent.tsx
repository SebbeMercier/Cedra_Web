"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { Product } from "@/types";
import PageHeader from "@/components/layout/PageHeader";
import { useTranslation } from "@/lib/i18n";
import { SearchResults } from "@/components/pages/search/SearchResults";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const results = await api.products.search(query);
        setProducts(results);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader
        title={t.search.title}
        titleAccent={t.search.titleAccent}
        subtitle={`${t.search.found} ${products.length} ${t.search.resultsFor}: "${query}"`}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-8">
        <SearchResults
          products={products}
          loading={loading}
          query={query}
          t={t}
        />
      </div>
    </div>
  );
}
