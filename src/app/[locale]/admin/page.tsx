"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  Package,
  Calendar,
  AlertTriangle,
  Zap,
  ArrowUpRight,
  Plus,
  Box,
  Users,
  ShoppingCart,
  DollarSign,
  ListTree,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/lib/api";
import { AdminSummary } from "@/types";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        // Verify admin role first
        const user = await api.auth.me(token);
        setCurrentUser(user);
        
        if (user.role !== "admin") {
          router.push("/dashboard");
          return;
        }

        const data = await api.admin.getSummary(token);
        setSummary(data);
      } catch (err: any) {
        console.error("Failed to fetch admin summary", err);
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 bg-background flex items-center justify-center">
        <div className="text-cedra-500 animate-spin">
          <Zap size={48} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 bg-background flex items-center justify-center">
        <div className="max-w-md w-full bg-red-500/10 border border-red-500/20 p-8 rounded-[2rem] text-center shadow-2xl">
          <AlertTriangle className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-white font-bold text-xl mb-2">Access Denied</h2>
          <p className="text-red-500/80 text-sm mb-4">{error}</p>
          
          <div className="bg-black/40 rounded-xl p-4 mb-6 text-left border border-white/5 overflow-auto max-h-40">
            <p className="text-[10px] font-black uppercase text-white/40 mb-2 tracking-widest">Raw User Data:</p>
            <pre className="text-[10px] text-cedra-500 font-mono">
              {JSON.stringify(currentUser, null, 2)}
            </pre>
          </div>

          <Button 
            onClick={() => router.push("/dashboard")}
            className="bg-white text-black hover:bg-zinc-200 w-full rounded-xl font-bold"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-cedra-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              <Zap size={14} />
              <span>System Administrator</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-outfit tracking-tighter italic uppercase text-white">
              Global <span className="text-cedra-500">Overview</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <Link href="/admin/categories">
              <Button
                variant="outline"
                className="rounded-xl h-12 border-white/10 hover:bg-white/10 text-white transition-all uppercase text-[10px] font-bold tracking-widest px-6"
              >
                <ListTree size={16} className="mr-2" /> Categories
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button
                variant="outline"
                className="rounded-xl h-12 border-white/10 hover:bg-white/10 text-white transition-all uppercase text-[10px] font-bold tracking-widest px-6"
              >
                <Box size={16} className="mr-2" /> Inventory
              </Button>
            </Link>
            <Link href="/admin/products/new">
              <Button className="bg-white text-black hover:bg-cedra-500 hover:text-white transition-all rounded-xl px-6 font-bold uppercase tracking-widest text-[10px] h-12">
                <Plus size={16} className="mr-2" /> Add Asset
              </Button>
            </Link>
            <Button
              variant="outline"
              className="rounded-xl h-12 border-white/10 hover:bg-white/10 text-white transition-all uppercase text-[10px] font-bold tracking-widest px-6"
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/login");
              }}
            >
              Logout
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatBox
            icon={<DollarSign />}
            label="Total Revenue"
            value={`€${(summary?.total_sales_amount || 0).toLocaleString()}`}
            trend="up"
          />
          <StatBox
            icon={<ShoppingCart />}
            label="Total Orders"
            value={(summary?.total_orders || 0).toString()}
            trend="up"
          />
          <StatBox
            icon={<Users />}
            label="Total Users"
            value={(summary?.total_users || 0).toString()}
            trend="stable"
          />
          <StatBox
            icon={<AlertTriangle />}
            label="Low Stock Items"
            value={(summary?.products_low_stock || 0).toString()}
            trend={
              (summary?.products_low_stock || 0) > 0 ? "down" : "stable"
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white/2 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cedra-500/5 blur-3xl rounded-full"></div>
            <h3 className="text-xl font-bold mb-8 text-white flex items-center gap-3">
              <TrendingUp className="text-cedra-500" />
              Sales By Category
            </h3>

            <div className="space-y-4">
              {Object.entries(summary?.sales_by_category || {}).map(
                ([category, amount], i) => (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-white uppercase tracking-wider">
                      <span>{category}</span>
                      <span>€{amount.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(amount / (summary?.total_sales_amount || 1)) * 100}%`,
                        }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className="h-full bg-cedra-500"
                      />
                    </div>
                  </div>
                ),
              )}
              {Object.keys(summary?.sales_by_category || {}).length === 0 && (
                <p className="text-white/40 text-sm italic">
                  No sales data available yet.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
              <Zap className="text-cedra-500" />
              System Health & Alerts
            </h3>

            {(summary?.products_low_stock || 0) > 0 && (
              <ActionItem
                title="Low Stock Alert"
                desc={`${summary?.products_low_stock} products are below their safety stock threshold. Replenishment recommended.`}
                severity="high"
              />
            )}

            {(summary?.pending_orders || 0) > 0 && (
              <ActionItem
                title="Pending Orders"
                desc={`${summary?.pending_orders} orders are awaiting processing or payment.`}
                severity="medium"
              />
            )}

            {(summary?.recent_fraud_alerts || 0) > 0 && (
              <ActionItem
                title="Fraud Alerts Detected"
                desc={`${summary?.recent_fraud_alerts} suspicious transactions flagged by AI.`}
                severity="high"
              />
            )}

            <ActionItem
              title="System Status"
              desc="All systems operational. AI Inference Engine running on GPU."
              severity="low"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({
  icon,
  label,
  value,
  trend,
}: {
  icon: any;
  label: string;
  value: string;
  trend: "up" | "down" | "stable";
}) {
  return (
    <div className="bg-white/[0.02] backdrop-blur-3xl p-8 rounded-3xl border border-white/10 hover:border-cedra-500/30 transition-all group shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white/5 rounded-2xl text-cedra-500 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div
          className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-white/20"}`}
        >
          {trend === "up" && <ArrowUpRight size={12} />}
          {trend}
        </div>
      </div>
      <div className="text-3xl font-black text-white tracking-tighter mb-1">
        {value}
      </div>
      <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
        {label}
      </div>
    </div>
  );
}

function ActionItem({
  title,
  desc,
  severity,
}: {
  title: string;
  desc: string;
  severity: "high" | "medium" | "low";
}) {
  const colors = {
    high: "border-cedra-500/50 bg-cedra-500/5",
    medium: "border-yellow-600/30 bg-yellow-600/5",
    low: "border-blue-600/30 bg-blue-600/5",
  };

  return (
    <motion.div
      whileHover={{ x: 10 }}
      className={`p-6 rounded-3xl border ${colors[severity]} transition-all flex items-start gap-4 backdrop-blur-md shadow-xl`}
    >
      <div className="mt-1">
        {severity === "high" ? (
          <AlertTriangle className="text-cedra-500" size={20} />
        ) : (
          <TrendingUp className="text-white/40" size={20} />
        )}
      </div>
      <div>
        <h4 className="font-bold text-white mb-1">{title}</h4>
        <p className="text-xs text-white/50 leading-relaxed font-medium">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}