"use client";

import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import { useTranslation } from "@/lib/i18n";

export default function LegalContent() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background pb-32">
      <PageHeader
        title={t.legal.title || "Mentions Légales"}
        titleAccent={t.legal.titleAccent || "CGV"}
        subtitle={t.legal.subtitle || "Conditions Générales de Vente et d'Utilisation"}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 mt-12 space-y-12 text-zinc-400">
        <section>
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4">1. Préambule</h2>
          <p className="leading-relaxed">
            Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des transactions effectuées sur la plateforme B2B de Cedra. Elles s'appliquent à tous les clients professionnels inscrits et validés.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4">2. Commandes & Devis</h2>
          <p className="leading-relaxed">
            Toute commande passée sur le site engage l'acheteur dès sa validation. Les devis sont valables 30 jours sauf mention contraire. Cedra se réserve le droit de refuser une commande en cas de litige antérieur ou de non-paiement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4">3. Paiement & Facturation</h2>
          <p className="leading-relaxed">
            Les prix sont affichés HTVA sauf indication contraire. Le paiement est dû selon les conditions accordées à chaque compte professionnel (comptant, 30 jours fin de mois, etc.). Tout retard entraînera des pénalités de retard.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4">4. Livraison & Retours</h2>
          <p className="leading-relaxed">
            Les délais de livraison sont donnés à titre indicatif. Les retours sont acceptés sous 14 jours pour les produits standards, non déballés et dans leur emballage d'origine, moyennant accord préalable du service client.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4">5. Confidentialité</h2>
          <p className="leading-relaxed">
            Cedra s'engage à protéger les données de ses partenaires. Vos informations ne sont jamais revendues à des tiers.
          </p>
        </section>
      </div>
    </div>
  );
}
