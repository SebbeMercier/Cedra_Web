import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";

interface CategoryFormProps {
  parentId: string;
  setParentId: (id: string) => void;
  newCatSlug: string;
  setNewCatSlug: (slug: string) => void;
  newCatName: string;
  setNewCatName: (name: string) => void;
  handleCreate: (e: React.FormEvent) => void;
  isSaving: boolean;
  categories: any[];
}

export function CategoryForm({
  parentId,
  setParentId,
  newCatSlug,
  setNewCatSlug,
  newCatName,
  setNewCatName,
  handleCreate,
  isSaving,
  categories,
}: CategoryFormProps) {
  return (
    <div className="md:col-span-1">
      <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] sticky top-32">
        <h3 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
          <Plus size={14} className="text-cedra-500" /> New Category
        </h3>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-black text-zinc-500">
              Add to Root Category
            </Label>
            <select
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-cedra-500/50 outline-none transition-all"
            >
              <option value="">None (Create a Root Category)</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.slug || c.id}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-black text-zinc-500">
              Slug (Unique ID)
            </Label>
            <Input
              value={newCatSlug}
              onChange={(e) => setNewCatSlug(e.target.value)}
              placeholder="electronics"
              required
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-black text-zinc-500">
              Display Name
            </Label>
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
            {isSaving ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create Category"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
