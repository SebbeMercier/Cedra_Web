import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";

interface TwoFAFormProps {
  t: any;
  handleVerify2FA: (e: React.FormEvent) => void;
  isLoading: boolean;
  formData: any;
  setFormData: any;
  setStep: (step: "login" | "2fa") => void;
}

export function TwoFAForm({
  t,
  handleVerify2FA,
  isLoading,
  formData,
  setFormData,
  setStep,
}: TwoFAFormProps) {
  return (
    <motion.form
      key="2fa-form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleVerify2FA}
      className="space-y-8"
    >
      <div className="text-center">
        <div className="w-20 h-20 bg-cedra-500/10 border border-cedra-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-cedra-500 shadow-[0_0_30px_rgba(230,0,35,0.2)]">
          <Lock size={36} />
        </div>
        <p className="text-zinc-400 text-sm font-medium">{t.login.twoFADesc}</p>
      </div>

      <div>
        <Label
          htmlFor="code"
          className="text-center block mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500"
        >
          {t.login.twoFALabel}
        </Label>
        <Input
          id="code"
          type="text"
          placeholder="000000"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          required
          className="bg-white/5 border-white/5 focus:border-cedra-500/50 focus:bg-white/10 transition-all text-center text-4xl tracking-[0.5em] font-black h-20 rounded-2xl"
          maxLength={6}
          autoComplete="one-time-code"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-16 rounded-2xl text-xs uppercase tracking-[0.3em] font-black bg-white text-black hover:bg-cedra-500 hover:text-white transition-all duration-500"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : t.login.verifyBtn}
      </Button>

      <button
        type="button"
        onClick={() => setStep("login")}
        className="w-full text-center text-[10px] uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
      >
        {t.login.backToLogin}
      </button>
    </motion.form>
  );
}
