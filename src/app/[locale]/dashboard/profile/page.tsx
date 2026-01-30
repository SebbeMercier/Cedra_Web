"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import { useTranslation } from "@/lib/i18n";
import { User, Shield, Bell, CreditCard, Building2, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { User as UserType } from "@/types";
import { ProfileNavItem } from "@/components/pages/dashboard/profile/ProfileNavItem";
import { ProfileForm } from "@/components/pages/dashboard/profile/ProfileForm";

export default function ProfilePage() {
  const { t } = useTranslation();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await api.auth.me(token);
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-cedra-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <PageHeader
        title={t.dashboard.accountSettings}
        titleAccent="Profil"
        subtitle="Gérez vos informations personnelles et préférences de sécurité."
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            <ProfileNavItem
              icon={<User size={18} />}
              label="Informations"
              active
            />
            <ProfileNavItem icon={<Shield size={18} />} label="Sécurité" />
            <ProfileNavItem icon={<Bell size={18} />} label="Notifications" />
            <ProfileNavItem
              icon={<CreditCard size={18} />}
              label="Facturation"
            />
            <ProfileNavItem icon={<Building2 size={18} />} label="Entreprise" />
          </div>

          {/* Form Content */}
          <div className="lg:col-span-9">
            <ProfileForm user={user} t={t} />
          </div>
        </div>
      </div>
    </div>
  );
}