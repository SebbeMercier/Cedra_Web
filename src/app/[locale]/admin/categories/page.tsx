"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Plus, ListTree, Loader2, Tag, Trash2, ChevronRight, CornerDownRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category } from "@/types";
import { motion } from "framer-motion";

export default function AdminCategoriesPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [flatCategories, setFlatCategories] = useState<Category[]>([]);
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [parentId, setParentId] = useState<string>("");
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
        fetchCategories();
      } catch (e) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  const fetchCategories = async () => {
    try {
      const tree = await api.categories.getTree();
      setCategories(tree);
      
      // Also fetch flat list for the dropdown
      const flat = await api.categories.list();
      setFlatCategories(flat);
    } catch (e) {
      console.error("Failed to fetch categories", e);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatSlug) return alert("Slug is required");
    setIsSaving(true);
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await api.categories.create(token, {
        slug: newCatSlug,
        name: newCatName,
        parent_id: parentId || undefined,
        is_active: true,
      });
      setNewCatName("");
      setNewCatSlug("");
      setParentId("");
      fetchCategories();
      alert("Category Created!");
    } catch (e: any) {
      alert(`Failed to create category: ${e.message}`);
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
    <div className="min-h-screen pt-32 pb-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-cedra-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              <ListTree size={14} />
              <span>Taxonomy Management</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-outfit tracking-tighter italic uppercase text-white">
              Product <span className="text-cedra-500">Hierarchy</span>
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] sticky top-32">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                <Plus size={14} className="text-cedra-500" /> New Category
              </h3>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-zinc-500">Add to Root Category</Label>
                  <select
                    value={parentId}
                    onChange={(e) => setParentId(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-cedra-500/50 outline-none transition-all"
                  >
                    <option value="">None (Create a Root Category)</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.slug || c.id}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-zinc-500">Slug (Unique ID)</Label>
                  <Input
                    value={newCatSlug}
                    onChange={(e) => setNewCatSlug(e.target.value)}
                    placeholder="electronics"
                    required
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-zinc-500">Display Name</Label>
                  <Input
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="Electronics & Tech"
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-white text-black hover:bg-cedra-500 hover:text-white font-black uppercase tracking-widest text-[10px] h-12 rounded-xl transition-all"
                >
                  {isSaving ? <Loader2 className="animate-spin" /> : "Create Category"}
                </Button>
              </form>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="space-y-4">
              {categories.map((cat, i) => (
                <CategoryItem key={cat.id} cat={cat} depth={0} index={i} />
              ))}
              {categories.length === 0 && (
                <div className="py-20 text-center text-white/20 border border-dashed border-white/10 rounded-3xl">
                  No categories found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryItem({ cat, depth, index }: { cat: any, depth: number, index: number }) {
  const { locale } = useTranslation();
  const displayName = typeof cat.name === 'object' ? (cat.name[locale] || cat.name['fr'] || cat.name['en'] || cat.slug || cat.id) : (cat.name || cat.slug || cat.id);

  return (
    <div className="space-y-2">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 + depth * 0.1 }}
        style={{ marginLeft: `${depth * 24}px` }}
        className={`bg-white/[0.03] border border-white/5 p-4 rounded-2xl flex items-center justify-between group hover:border-cedra-500/30 transition-all ${depth > 0 ? 'bg-white/[0.01]' : ''}`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${depth === 0 ? 'bg-cedra-500/10 text-cedra-500' : 'bg-white/5 text-white/20'}`}>
            {depth === 0 ? <Tag size={14} /> : <CornerDownRight size={14} />}
          </div>
          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              {displayName}
              {'sub_categories' in cat && cat.sub_categories && cat.sub_categories.length > 0 && (
                <span className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-white/40">{cat.sub_categories.length}</span>
              )}
            </div>
            <div className="text-[9px] text-white/20 font-mono">
              ID: {cat.id}
            </div>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="text-white/20 hover:text-red-500 transition-colors p-2">
            <Trash2 size={14} />
          </button>
        </div>
      </motion.div>
      
      {'sub_categories' in cat && cat.sub_categories && cat.sub_categories.length > 0 && (
        <div className="space-y-2">
          {cat.sub_categories.map((child: any, idx: number) => (
            <CategoryItem key={child.id} cat={child} depth={depth + 1} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
