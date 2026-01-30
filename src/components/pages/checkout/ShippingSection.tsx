import React from "react";
import { Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ShippingSection() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-cedra-500/10 rounded-xl flex items-center justify-center text-cedra-500">
          <Truck size={20} />
        </div>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
          Livraison
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="firstName"
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
          >
            Prénom
          </Label>
          <Input
            id="firstName"
            required
            className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-cedra-500"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="lastName"
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
          >
            Nom
          </Label>
          <Input
            id="lastName"
            required
            className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-cedra-500"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="address"
          className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
        >
          Adresse
        </Label>
        <Input
          id="address"
          required
          className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-cedra-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-2">
          <Label
            htmlFor="city"
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
          >
            Ville
          </Label>
          <Input
            id="city"
            required
            className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-cedra-500"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="zip"
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
          >
            Code Postal
          </Label>
          <Input
            id="zip"
            required
            className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-cedra-500"
          />
        </div>
      </div>
    </section>
  );
}
