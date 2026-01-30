import React from "react";
import { Package, Sparkles, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductCreateFormProps {
  t: any;
  name: string;
  setName: (val: string) => void;
  categoryId: string;
  setCategoryId: (val: string) => void;
  flattenedCategories: any[];
  sku: string;
  setSku: (val: string) => void;
  price: string;
  setPrice: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  isGenerating: boolean;
  handleGenerateAI: () => void;
  isSaving: boolean;
  handleSave: () => void;
}

export function ProductCreateForm({
  t,
  name,
  setName,
  categoryId,
  setCategoryId,
  flattenedCategories,
  sku,
  setSku,
  price,
  setPrice,
  description,
  setDescription,
  isGenerating,
  handleGenerateAI,
  isSaving,
  handleSave,
}: ProductCreateFormProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-cedra-500/10 rounded-[2rem] flex items-center justify-center text-cedra-500 mx-auto mb-6 border border-cedra-500/20 shadow-2xl">
          <Package size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-4">
          {t.admin.newAsset}{" "}
          <span className="text-cedra-500">{t.admin.newAssetAccent}</span>
        </h1>
        <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest">
          {t.admin.registerStock}
        </p>
      </div>

      <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 p-10 rounded-[3rem] space-y-8 shadow-2xl">
        <div className="space-y-2">
          <Label className="pl-2 text-[10px] uppercase font-black text-zinc-500">
            {t.admin.productName}
          </Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-cedra-500/50 outline-none transition-all h-14 font-bold text-lg"
            placeholder="e.g. Rack Server 4U"
          />
        </div>

        <div className="space-y-2">
          <Label className="pl-2 text-[10px] uppercase font-black text-zinc-500">
            Category
          </Label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-4 py-4 text-white focus:border-cedra-500/50 outline-none transition-all h-14 font-bold text-sm"
          >
            {flattenedCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
            {flattenedCategories.length === 0 && (
              <option value="">No categories available</option>
            )}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="pl-2 text-[10px] uppercase font-black text-zinc-500">
              {t.admin.sku}
            </Label>
            <Input
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-cedra-500/50 outline-none transition-all h-14 font-mono font-bold"
              placeholder="PROD-001"
            />
          </div>
          <div className="space-y-2">
            <Label className="pl-2 text-[10px] uppercase font-black text-zinc-500">
              {t.admin.price}
            </Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-cedra-500/50 outline-none transition-all h-14 font-bold"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="relative space-y-2">
          <div className="flex justify-between items-end mb-2">
            <Label className="pl-2 text-[10px] uppercase font-black text-zinc-500">
              {t.admin.description}
            </Label>
            <button
              onClick={handleGenerateAI}
              disabled={isGenerating || !name}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cedra-500 hover:text-white transition-all disabled:opacity-20"
            >
              <Sparkles
                size={14}
                className={isGenerating ? "animate-spin" : ""}
              />{" "}
              {isGenerating ? t.admin.generating : t.admin.generateAI}
            </button>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-white min-h-[200px] focus:border-cedra-500/50 outline-none transition-all font-medium leading-relaxed placeholder:text-white/5"
            placeholder="Detailed technical specification..."
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full h-20 bg-white text-black rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm hover:bg-cedra-500 hover:text-white transition-all flex items-center justify-center gap-3 mt-4 shadow-2xl"
        >
          {isSaving ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Save size={20} /> {t.admin.saveProduct}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
