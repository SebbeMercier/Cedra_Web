"use client";

import React, { useEffect, useState } from "react";
import {
  Package,
  Shield,
  ShoppingBag,
  Zap,
  Power,
  Lock,
} from "lucide-react";
import { api } from "@/lib/api";
import { User, Order } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";
import { StatsCard } from "@/components/pages/dashboard/StatsCard";
import { SupportLink } from "@/components/pages/dashboard/SupportLink";
import { RecentOrders } from "@/components/pages/dashboard/RecentOrders";
import { OrganizationPanel } from "@/components/pages/dashboard/OrganizationPanel";

export default function DashboardContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [companyUsers, setCompanyUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }
        const userData = await api.auth.me(token);

        if (userData.role === "admin") {
          router.push("/admin");
          return;
        }

        setUser(userData);

        try {
          const ordersData = await api.orders.list(token);
          const ordersList = Array.isArray(ordersData)
            ? ordersData
            : ordersData.orders || ordersData.items || [];
          setOrders(ordersList);
        } catch (e) {
          console.error("Failed to load orders", e);
        }

        if (userData.role === "company_admin" && userData.company_id) {
          const users = await api.companies.getUsers(
            token,
            userData.company_id,
          );
          setCompanyUsers(users);
        }
      } catch (error) {
        console.error("Failed to load dashboard data", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [router]);

  const handleRemoveUser = async (userId: string) => {
    if (!confirm("Are you sure you want to remove this user?")) return;
    const token = localStorage.getItem("token");
    if (!token || !user?.company_id) return;
    try {
      await api.companies.removeUser(token, user.company_id, userId);
      setCompanyUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (e) {
      console.error("Failed to remove user", e);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-cedra-500"
        >
          <Zap size={48} className="fill-current" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-background relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cedra-500/5 blur-[150px] rounded-full pointer-events-none -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none -ml-32 -mb-32"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 text-cedra-500 text-[11px] font-black uppercase tracking-[0.4em] mb-4">
              <span className="w-8 h-[1px] bg-cedra-500"></span>
              <span>Intelligence Portal</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black font-display tracking-tighter italic uppercase text-white leading-[0.85]">
              {t.dashboard.welcome} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cedra-500 to-cedra-600">
                {user?.name || "Member"}
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-wrap gap-4"
          >
            <div className="bg-zinc-900/40 backdrop-blur-3xl px-8 py-5 rounded-3xl border border-white/5 flex items-center gap-6 shadow-2xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-cedra-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center text-cedra-500 border border-white/5 shadow-lg relative z-10">
                <Shield size={24} />
              </div>
              <div className="relative z-10">
                <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">
                  {t.dashboard.accountStatus}
                </div>
                <div className="text-lg font-black text-white flex items-center gap-3 italic uppercase tracking-tighter font-display">
                  {user?.role || "Member"}
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              className="h-14 w-14 rounded-2xl border border-white/5 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all text-zinc-500"
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/login");
              }}
            >
              <Power size={20} />
            </Button>
          </motion.div>
        </header>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <StatsCard
            icon={<ShoppingBag size={20} />}
            label="Dépenses Mensuelles"
            value="€12,450"
            trend="+12.5%"
            trendUp={true}
            color="cedra"
          />
          <StatsCard
            icon={<Package size={20} />}
            label="Commandes en cours"
            value={orders
              .filter((o) => o.status !== "delivered")
              .length.toString()}
            trend="Stable"
            trendUp={true}
            color="blue"
          />
          <StatsCard
            icon={<Zap size={20} />}
            label="Économies IA"
            value="€2,100"
            trend="+5%"
            trendUp={true}
            color="green"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            <RecentOrders orders={orders} t={t} />

            {/* Quick Actions / Recommendations */}
            <section className="bg-gradient-to-br from-cedra-500/10 via-transparent to-transparent rounded-[3rem] border border-cedra-500/20 p-10 backdrop-blur-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cedra-500/5 blur-[80px] rounded-full pointer-events-none transition-transform group-hover:scale-150 duration-700"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-6 flex items-center gap-4 font-display">
                  <Zap className="text-cedra-500 fill-cedra-500 animate-pulse" />
                  AI Insights & Reappro
                </h3>
                <p className="text-zinc-400 font-medium mb-8 max-w-xl">
                  Nos algorithmes prédisent une hausse de demande sur vos
                  composants de protection de circuit. Souhaitez-vous anticiper
                  vos stocks ?
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => router.push("/products")}
                    className="bg-white text-black hover:bg-cedra-500 hover:text-white h-12 px-8 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all"
                  >
                    Voir Recommandations
                  </Button>
                  <Button
                    variant="ghost"
                    className="border border-white/10 text-white hover:bg-white/5 h-12 px-8 rounded-xl font-black uppercase tracking-widest text-[10px]"
                  >
                    Ignorer
                  </Button>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Organization Panel */}
            {user?.role === "company_admin" && (
              <OrganizationPanel
                user={user}
                companyUsers={companyUsers}
                onRemoveUser={handleRemoveUser}
                onRefreshUsers={setCompanyUsers}
              />
            )}

            {/* Quick Links / Support */}
            <section className="bg-zinc-900/40 rounded-[2rem] border border-white/10 p-8">
              <h4 className="text-white font-black uppercase tracking-widest text-[11px] mb-6 flex items-center gap-3">
                <Shield size={14} className="text-zinc-600" />
                Support & Sécurité
              </h4>
              <div className="space-y-4">
                <SupportLink icon={<Lock size={14} />} label="Gérer mon 2FA" />
                <SupportLink
                  icon={<ShoppingBag size={14} />}
                  label="Mes adresses de livraison"
                />
                <SupportLink
                  icon={<Package size={14} />}
                  label="Documentation Technique"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
