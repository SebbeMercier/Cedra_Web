"use client";

import React from "react";
import { Calculator, ListChecks, Send, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { QuoteForm } from "@/components/pages/quotes/QuoteForm";
import { QuoteSidebar } from "@/components/pages/quotes/QuoteSidebar";

export default function QuotesPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-4">
            {t.quotes.title}{" "}
            <span className="text-cedra-500">{t.quotes.titleAccent}</span>
          </h1>
          <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest">
            {t.quotes.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <QuoteForm t={t} />
          <QuoteSidebar
            t={t}
            Calculator={Calculator}
            ListChecks={ListChecks}
            Send={Send}
            ArrowRight={ArrowRight}
          />
        </div>
      </div>
    </div>
  );
}