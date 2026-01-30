import React from "react";
import { CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PaymentSection() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-cedra-500/10 rounded-xl flex items-center justify-center text-cedra-500">
          <CreditCard size={20} />
        </div>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
          Paiement
        </h2>
      </div>
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex items-center justify-between p-4 rounded-xl bg-cedra-500/5 border border-cedra-500/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-zinc-800 rounded flex items-center justify-center text-[10px] font-bold text-zinc-500 italic uppercase">
              Card
            </div>
            <div>
              <p className="text-sm font-black text-white italic uppercase tracking-tighter">
                Carte de Crédit / Débit
              </p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                Visa, Mastercard, Bancontact
              </p>
            </div>
          </div>
          <div className="w-5 h-5 rounded-full border-2 border-cedra-500 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-cedra-500 rounded-full" />
          </div>
        </div>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label
              htmlFor="cardNum"
              className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
            >
              Numéro de Carte
            </Label>
            <Input
              id="cardNum"
              placeholder="0000 0000 0000 0000"
              className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-cedra-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="expiry"
                className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
              >
                Expiration
              </Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-cedra-500"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="cvv"
                className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
              >
                CVV
              </Label>
              <Input
                id="cvv"
                placeholder="123"
                className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-cedra-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
