"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShieldCheck,
  Building2,
  Zap,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n";

// Validation Schema with Zod
const registerSchema = z
  .object({
    company_name: z
      .string()
      .min(2, "Company name must be at least 2 characters"),
    vat_number: z
      .string()
      .regex(
        /^[A-Z]{2}\s?[0-9.\s]{8,15}$/,
        "Invalid VAT format (ex: BE 0123.456.789)",
      ),
    sector: z.string(),
    company_size: z.string(),
    street: z.string().min(3, "Street is required"),
    number: z.string().min(1, "No. is required"),
    box: z.string().optional(),
    postal_code: z.string().min(4, "Invalid Zip"),
    city: z.string().min(2, "City is required"),
    country: z.string().min(1, "Country is required"),
    name: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterProFormProps {
  t: any;
}

export function RegisterProForm({ t }: RegisterProFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      sector: "Electrical",
      company_size: "1-10",
      country: "Belgium",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const response = await api.auth.registerBusiness(data);
      localStorage.setItem("token", response.token);
      router.push("/dashboard");
    } catch (err: any) {
      setServerError(err.message || "Registration failed. Please try again.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/2 backdrop-blur-3xl border border-white/5 p-12 rounded-[3.5rem] shadow-2xl relative">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence>
            {serverError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 mb-6"
              >
                <AlertCircle className="text-red-500" size={20} />
                <p className="text-red-500 text-sm font-bold">{serverError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Section 1: Company Details */}
            <div className="space-y-4">
              <h3 className="text-white font-black uppercase italic tracking-widest text-sm flex items-center gap-2 border-b border-white/5 pb-2">
                <Building2 className="text-cedra-500" size={18} />{" "}
                {t.register.companyDetails}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="company_name">{t.auth.companyName}</Label>
                  <Input
                    {...register("company_name")}
                    placeholder="Electric Solutions Ltd"
                    className="bg-white/5 border-white/10"
                  />
                  {errors.company_name && (
                    <p className="text-red-500 text-[10px] mt-1 font-bold">
                      {errors.company_name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="vat_number">{t.auth.vatNumber}</Label>
                  <Input
                    {...register("vat_number")}
                    placeholder="BE 0123.456.789"
                    className="bg-white/5 border-white/10"
                  />
                  {errors.vat_number && (
                    <p className="text-red-500 text-[10px] mt-1 font-bold">
                      {errors.vat_number.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="sector">Sector</Label>
                  <select
                    {...register("sector")}
                    className="flex h-10 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-1 text-sm shadow-sm transition-colors text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cedra-500"
                  >
                    <option value="Electrical">Electrical</option>
                    <option value="Construction">Construction</option>
                    <option value="Industrial">Industrial</option>
                    <option value="IT">IT & Infrastructure</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Address */}
            <div className="space-y-4">
              <h3 className="text-white font-black uppercase italic tracking-widest text-sm flex items-center gap-2 border-b border-white/5 pb-2">
                <Zap className="text-cedra-500" size={18} />{" "}
                {t.register.billingAddress}
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                  <Label htmlFor="street">Street</Label>
                  <Input
                    {...register("street")}
                    placeholder="Rue de l'Industrie"
                    className="bg-white/5 border-white/10"
                  />
                  {errors.street && (
                    <p className="text-red-500 text-[10px] mt-1 font-bold">
                      {errors.street.message}
                    </p>
                  )}
                </div>
                <div className="col-span-1">
                  <Label htmlFor="number">No.</Label>
                  <Input
                    {...register("number")}
                    placeholder="10"
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-1">
                  <Label htmlFor="box">Box</Label>
                  <Input
                    {...register("box")}
                    placeholder="A"
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="col-span-1">
                  <Label htmlFor="postal_code">Zip</Label>
                  <Input
                    {...register("postal_code")}
                    placeholder="1000"
                    className="bg-white/5 border-white/10"
                  />
                  {errors.postal_code && (
                    <p className="text-red-500 text-[10px] mt-1 font-bold">
                      {errors.postal_code.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    {...register("city")}
                    placeholder="Brussels"
                    className="bg-white/5 border-white/10"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-[10px] mt-1 font-bold">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Admin Account */}
            <div className="space-y-4">
              <h3 className="text-white font-black uppercase italic tracking-widest text-sm flex items-center gap-2 border-b border-white/5 pb-2">
                <ShieldCheck className="text-cedra-500" size={18} />{" "}
                {t.register.adminAccount}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="name">Admin Full Name</Label>
                  <Input
                    {...register("name")}
                    placeholder="John Doe"
                    className="bg-white/5 border-white/10"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-[10px] mt-1 font-bold">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">{t.auth.email}</Label>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="admin@company.com"
                    className="bg-white/5 border-white/10"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[10px] mt-1 font-bold">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">{t.auth.phone}</Label>
                  <Input
                    {...register("phone")}
                    type="tel"
                    placeholder="+32 470 00 00 00"
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="md:col-span-2 relative">
                  <Label htmlFor="password">{t.auth.password}</Label>
                  <div className="relative">
                    <Input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pr-12 bg-white/5 border-white/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-[10px] mt-1 font-bold">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 relative">
                  <Label htmlFor="confirmPassword">
                    {t.auth.confirmPassword}
                  </Label>
                  <div className="relative">
                    <Input
                      {...register("confirmPassword")}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pr-12 bg-white/5 border-white/10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-[10px] mt-1 font-bold">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 rounded-2xl text-[10px] uppercase tracking-[0.3em] font-black shadow-cedra-500/40 hover:bg-cedra-600 transition-all bg-cedra-500 text-white"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                t.register.submitPro
              )}
            </Button>
          </form>
        </div>

        <div className="hidden lg:flex flex-col space-y-6">
          <div className="bg-white/5 rounded-3xl p-8 space-y-8 flex flex-col justify-center border border-white/5 sticky top-8">
            <h3 className="text-white font-black uppercase text-xl italic tracking-tighter">
              {t.register.whyPro.split(" ").slice(0, 3).join(" ")}{" "}
              <span className="text-cedra-500">
                {t.register.whyPro.split(" ").slice(3).join(" ")}
              </span>
            </h3>
            <ProBenefit
              title={t.register.benefit1Title}
              desc={t.register.benefit1Desc}
            />
            <ProBenefit
              title={t.register.benefit2Title}
              desc={t.register.benefit2Desc}
            />
            <ProBenefit
              title={t.register.benefit3Title}
              desc={t.register.benefit3Desc}
            />
            <ProBenefit
              title={t.register.benefit4Title}
              desc={t.register.benefit4Desc}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProBenefit({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="space-y-1">
      <h4 className="text-white font-black uppercase italic tracking-widest text-xs flex items-center gap-2">
        <Zap className="text-cedra-500" size={14} /> {title}
      </h4>
      <p className="text-[10px] font-medium text-white/40 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
