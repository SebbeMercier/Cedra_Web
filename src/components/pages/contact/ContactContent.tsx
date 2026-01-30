"use client";

import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import { useTranslation } from "@/lib/i18n";
import { Mail, Phone, MapPin, Clock, Globe } from "lucide-react";
import { ContactInfoCard } from "@/components/pages/contact/ContactInfoCard";
import { ContactForm } from "@/components/pages/contact/ContactForm";

export default function ContactContent() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background pb-32">
      <PageHeader
        title={t.contact.title}
        titleAccent={t.contact.titleAccent}
        subtitle={t.contact.subtitle}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Info Side */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ContactInfoCard
                icon={<Mail className="w-6 h-6" />}
                title="Email"
                value="support@cedra.be"
                desc="Assistance technique 24/7"
              />
              <ContactInfoCard
                icon={<Phone className="w-6 h-6" />}
                title="Téléphone"
                value="+32 2 123 45 67"
                desc="Lun-Ven: 8h - 18h"
              />
              <ContactInfoCard
                icon={<MapPin className="w-6 h-6" />}
                title="Siège Social"
                value="Bruxelles, Belgique"
                desc="Rue de l'Électricité 42"
              />
              <ContactInfoCard
                icon={<Globe className="w-6 h-6" />}
                title="Réseau"
                value="25 Magasins"
                desc="Partout au Benelux"
              />
            </div>

            <div className="p-8 rounded-[2rem] bg-zinc-900/50 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cedra-500/10 blur-3xl -z-10" />
              <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-6">
                Support B2B Dédié
              </h3>
              <p className="text-zinc-500 font-medium mb-8 leading-relaxed">
                Vous avez un projet complexe ? Nos ingénieurs vous accompagnent
                pour définir vos besoins techniques et optimiser votre
                approvisionnement.
              </p>
              <div className="flex items-center gap-4 text-cedra-500 font-black italic uppercase tracking-widest text-[10px]">
                <Clock size={16} />
                Réponse en moins de 2 heures
              </div>
            </div>
          </div>

          {/* Form Side */}
          <ContactForm t={t} />
        </div>
      </div>
    </div>
  );
}
