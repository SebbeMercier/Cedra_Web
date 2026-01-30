import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, ArrowRight, AlertCircle } from "lucide-react";

interface LoginFormProps {
  t: any;
  handleLogin: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
  formData: any;
  setFormData: any;
}

export function LoginForm({
  t,
  handleLogin,
  isLoading,
  error,
  formData,
  setFormData,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.form
      key="login-form"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      onSubmit={handleLogin}
      className="space-y-8"
    >
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-center gap-3"
          >
            <AlertCircle className="text-red-500 shrink-0" size={18} />
            <p className="text-red-500 text-xs font-bold leading-tight">
              {error}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
        >
          {t.login.emailLabel}
        </Label>
        <div className="relative group">
          <Input
            id="email"
            type="email"
            placeholder="pro@cedra.be"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="bg-white/5 border-white/5 h-14 rounded-2xl px-6 focus:border-cedra-500/50 focus:bg-white/10 transition-all duration-300 placeholder:text-zinc-700 font-bold"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center ml-1">
          <Label
            htmlFor="password"
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500"
          >
            {t.login.passwordLabel}
          </Label>
          <Link
            href="#"
            className="text-[9px] font-black uppercase text-cedra-500 hover:text-white transition-colors tracking-widest"
          >
            {t.login.forgot}
          </Link>
        </div>
        <div className="relative group">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pr-14 bg-white/5 border-white/5 h-14 rounded-2xl px-6 focus:border-cedra-500/50 focus:bg-white/10 transition-all duration-300 placeholder:text-zinc-700 font-bold"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-16 rounded-2xl text-xs uppercase tracking-[0.3em] font-black bg-white text-black hover:bg-cedra-500 hover:text-white transition-all duration-500 shadow-xl disabled:opacity-50 group"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <div className="flex items-center gap-2">
            {t.login.signInBtn}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </div>
        )}
      </Button>
    </motion.form>
  );
}
