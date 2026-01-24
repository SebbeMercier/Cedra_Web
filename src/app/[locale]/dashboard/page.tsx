"use client";

import React, { useEffect, useState } from "react";
import {
  Package,
  User as UserIcon,
  Building2,
  Trash2,
  Shield,
  ShoppingBag,
  Clock,
  ChevronRight,
} from "lucide-react";
import { api } from "@/lib/api";
import { User, Order } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardPage() {
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

        // Fetch Orders
        try {
          const ordersData = await api.orders.list(token);
          // Handle potential wrapper or direct array
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

  const handleUpdateRole = async (userId: string, newRole: string) => {
    const token = localStorage.getItem("token");
    if (!token || !user?.company_id) return;
    try {
      await api.companies.updateRole(token, user.company_id, userId, {
        role: newRole,
      });
      setCompanyUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, role: newRole as any } : u,
        ),
      );
    } catch (e) {
      console.error("Failed to update role", e);
      alert("Failed to update role");
    }
  };

  const handleRemoveUser = async (userId: string) => {
    if (!confirm("Are you sure you want to remove this user?")) return;
    const token = localStorage.getItem("token");
    if (!token || !user?.company_id) return;
    try {
      await api.companies.removeUser(token, user.company_id, userId);
      setCompanyUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (e) {
      console.error("Failed to remove user", e);
      alert("Failed to remove user");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin text-cedra-500">
          <Package size={48} />
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
              <span>Customer Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-outfit tracking-tighter italic uppercase text-white">
              {t.dashboard.welcome}{" "}
              <span className="text-cedra-500">{user?.name || "User"}</span>
            </h1>
            <p className="text-white/40 mt-2 font-bold uppercase tracking-widest text-[10px]">
              {user?.email} • {user?.role || "Guest"}
            </p>
          </div>

          <div className="hidden md:flex gap-4">
            {user?.role === "admin" && (
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="rounded-2xl h-auto border-cedra-500/50 text-cedra-500 hover:bg-cedra-500 hover:text-white transition-all uppercase text-[10px] font-bold tracking-widest px-6"
                >
                  <Shield size={14} className="mr-2" /> Admin Panel
                </Button>
              </Link>
            )}
            <Button
              variant="outline"
              className="rounded-2xl h-auto border-white/10 hover:bg-cedra-500 hover:text-white hover:border-cedra-500 transition-all uppercase text-[10px] font-bold tracking-widest px-6"
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/login");
              }}
            >
              {t.dashboard.logout}
            </Button>
            <div className="bg-white/[0.03] backdrop-blur-3xl px-6 py-4 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/60">
                <UserIcon size={20} />
              </div>
              <div>
                <div className="text-[9px] text-white/40 uppercase font-black tracking-widest">
                  {t.dashboard.accountStatus}
                </div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  {t.dashboard.active}{" "}
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {user?.role !== "company_admin" && orders.length === 0 && (
          <div className="text-center py-20 bg-white/[0.02] rounded-[3rem] border border-white/5 backdrop-blur-3xl shadow-xl">
            <Package className="text-white/20 mx-auto mb-6" size={48} />
            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4">
              {t.dashboard.welcome} Cedra
            </h3>
            <p className="text-white/50 mb-8 max-w-md mx-auto font-medium">
              Access high-performance electrical components with AI-driven
              logistics.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => router.push("/products")}
                className="rounded-xl px-8 bg-white text-black hover:bg-cedra-500 hover:text-white transition-all uppercase font-bold tracking-widest text-xs h-12"
              >
                {t.dashboard.browseCatalogue}
              </Button>
            </div>
          </div>
        )}

        {/* Recent Orders Section */}
        {orders.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
                <ShoppingBag className="text-cedra-500" />
                Recent Orders
              </h3>
              <Link
                href="/orders"
                className="text-[10px] font-bold text-white/40 hover:text-white uppercase tracking-widest flex items-center gap-1 transition-colors"
              >
                View All <ChevronRight size={12} />
              </Link>
            </div>
            <div className="grid gap-4">
              {orders.slice(0, 3).map((order) => (
                <motion.div
                  key={order.id}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-cedra-500/30 transition-all cursor-pointer"
                  onClick={() => router.push(`/orders/${order.id}`)}
                >
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/40 font-black">
                      #{order.id.slice(-4)}
                    </div>
                    <div>
                      <div className="text-white font-bold mb-1">
                        Order #{order.id}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase font-bold tracking-wider">
                        <Clock size={10} />
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                      <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">
                        Total
                      </div>
                      <div className="text-white font-bold">
                        €{order.total_amount?.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          order.status === "delivered"
                            ? "border-green-500/30 bg-green-500/10 text-green-500"
                            : order.status === "pending"
                              ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-500"
                              : "border-white/10 bg-white/5 text-white/60"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {user?.role === "company_admin" && (
          <div className="mt-12 p-10 bg-white/[0.02] rounded-[3rem] border border-white/5 backdrop-blur-3xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
                  <Building2 className="text-cedra-500" />
                  {t.dashboard.organization}
                </h3>
                <p className="text-white/40 text-sm mt-2 font-medium">
                  Manage access for{" "}
                  <span className="text-white font-bold">
                    {user.company_id || "Your Company"}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-end bg-black/40 p-6 rounded-3xl border border-white/5 max-w-xl shadow-inner mb-12">
              <div className="flex-1 space-y-2">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                  Email Address
                </label>
                <input
                  id="invite-email"
                  type="email"
                  placeholder="colleague@company.com"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-cedra-500 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                  Role
                </label>
                <select
                  id="invite-role"
                  className="bg-transparent border-b border-white/20 pb-2 text-white outline-none"
                >
                  <option value="buyer" className="bg-background">
                    Buyer
                  </option>
                  <option value="viewer" className="bg-background">
                    Viewer
                  </option>
                  <option value="admin" className="bg-background">
                    Admin
                  </option>
                </select>
              </div>
              <Button
                onClick={async () => {
                  const email = (
                    document.getElementById("invite-email") as HTMLInputElement
                  ).value;
                  const role = (
                    document.getElementById("invite-role") as HTMLSelectElement
                  ).value as any;
                  const token = localStorage.getItem("token");
                  if (token && user.company_id && email) {
                    try {
                      await api.companies.inviteUser(token, user.company_id, {
                        email,
                        role,
                      });
                      alert(`Invitation sent to ${email}`);
                      (
                        document.getElementById(
                          "invite-email",
                        ) as HTMLInputElement
                      ).value = "";
                      // Refresh user list
                      const updatedUsers = await api.companies.getUsers(
                        token,
                        user.company_id,
                      );
                      setCompanyUsers(updatedUsers);
                    } catch (e) {
                      alert("Failed to invite user");
                    }
                  } else {
                    alert("Missing permissions or company ID");
                  }
                }}
                className="bg-white text-black hover:bg-cedra-500 hover:text-white transition-all rounded-xl px-6 font-bold uppercase tracking-widest text-[10px]"
              >
                {t.dashboard.invite}
              </Button>
            </div>

            {companyUsers.length > 0 && (
              <div className="mt-8">
                <h4 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-xs border-b border-white/5 pb-2">
                  <Shield size={14} className="text-cedra-500" /> Team Members
                </h4>
                <div className="space-y-4">
                  {companyUsers.map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div>
                        <div className="text-white font-bold text-sm">
                          {u.name || u.email}
                        </div>
                        <div className="text-white/30 text-[10px] uppercase font-bold tracking-wider">
                          {u.email}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <select
                          value={u.role}
                          onChange={(e) =>
                            handleUpdateRole(u.id, e.target.value)
                          }
                          className="bg-black/40 text-white text-[10px] font-bold uppercase tracking-widest border border-white/10 rounded-lg px-2 py-1 outline-none focus:border-cedra-500 transition-colors"
                        >
                          <option value="buyer" className="bg-zinc-900">
                            Buyer
                          </option>
                          <option value="viewer" className="bg-zinc-900">
                            Viewer
                          </option>
                          <option value="admin" className="bg-zinc-900">
                            Admin
                          </option>
                        </select>
                        <button
                          onClick={() => handleRemoveUser(u.id)}
                          className="text-white/20 hover:text-red-500 transition-colors p-2"
                          title="Remove User"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}