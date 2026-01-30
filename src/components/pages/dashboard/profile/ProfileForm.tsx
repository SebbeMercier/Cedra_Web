import React, { useState } from "react";
import { User, Key, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User as UserType } from "@/types";

interface ProfileFormProps {
  user: UserType | null;
  t: any;
}

export function ProfileForm({ user, t }: ProfileFormProps) {
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      alert("Profil mis à jour !");
    }, 1000);
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
      <form onSubmit={handleSave} className="space-y-12">
        <section className="space-y-8">
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
            <div className="w-20 h-20 bg-cedra-500/10 rounded-full flex items-center justify-center text-cedra-500 font-black text-3xl italic shadow-2xl">
              {user?.name?.[0] || "U"}
            </div>
            <div>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">
                {user?.name}
              </h3>
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
                {user?.role} - {user?.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                Nom Complet
              </Label>
              <Input
                defaultValue={user?.name}
                className="bg-white/5 border-white/10 h-14 rounded-2xl focus:border-cedra-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                Email
              </Label>
              <Input
                defaultValue={user?.email}
                className="bg-white/5 border-white/10 h-14 rounded-2xl focus:border-cedra-500"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                Téléphone
              </Label>
              <Input
                placeholder="+32 4XX XX XX XX"
                className="bg-white/5 border-white/10 h-14 rounded-2xl focus:border-cedra-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                Langue Préférée
              </Label>
              <select className="w-full bg-white/5 border border-white/10 h-14 rounded-2xl focus:outline-none focus:border-cedra-500 px-4 text-sm text-white appearance-none">
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="nl">Nederlands</option>
              </select>
            </div>
          </div>
        </section>

        <section className="space-y-6 pt-12 border-t border-white/5">
          <div className="flex items-center gap-3">
            <Key className="text-cedra-500 w-5 h-5" />
            <h3 className="text-lg font-black italic uppercase tracking-tighter text-white">
              Changer le mot de passe
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              type="password"
              placeholder="Mot de passe actuel"
              className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-cedra-500"
            />
            <Input
              type="password"
              placeholder="Nouveau mot de passe"
              className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-cedra-500"
            />
            <Input
              type="password"
              placeholder="Confirmer"
              className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-cedra-500"
            />
          </div>
        </section>

        <div className="flex justify-end pt-8">
          <Button
            disabled={saving}
            className="bg-white text-black hover:bg-cedra-500 hover:text-white h-16 px-12 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-xl transition-all flex items-center gap-3"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Save size={18} /> {t.common.save}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
