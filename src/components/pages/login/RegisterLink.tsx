import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface RegisterLinkProps {
  t: any;
}

export function RegisterLink({ t }: RegisterLinkProps) {
  return (
    <div className="mt-12 pt-10 border-t border-white/5 flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 ml-1">
          Nouveau chez Cedra ?
        </Label>
        <Link href="/register">
          <Button
            variant="ghost"
            className="w-full h-14 rounded-2xl text-[10px] uppercase tracking-widest border border-white/5 hover:border-white/20 hover:bg-white/5 text-zinc-400 font-black"
          >
            {t.login.createPersonal}
          </Button>
        </Link>
      </div>

      <Link href="/register-pro" className="group">
        <div className="p-6 bg-gradient-to-br from-cedra-500/10 to-transparent border border-cedra-500/20 rounded-3xl group-hover:from-cedra-500 group-hover:to-red-600 transition-all duration-700 flex items-center justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] pointer-events-none"></div>
          <div className="relative z-10">
            <h4 className="text-white font-black uppercase italic tracking-tighter text-xl leading-none font-display">
              COMPTE PRO <br /> CEDRA B2B
            </h4>
            <p className="text-[9px] font-black text-cedra-500 uppercase tracking-widest mt-2 group-hover:text-white/80 transition-colors">
              ACCÈS PRIORITAIRE & PRIX HTVA
            </p>
          </div>
          <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-xl group-hover:scale-110 relative z-10">
            <ArrowRight size={22} strokeWidth={3} />
          </div>
        </div>
      </Link>
    </div>
  );
}
