// components/home/HeroSection.tsx
"use client";

import React, { useState } from "react";
import { Search, Package, Clock, TrendingUp, MessageSquare, Truck, UserPlus, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/i18n";

export default function HeroSection() {
  const router = useRouter();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative w-full overflow-hidden flex flex-col items-center justify-start pt-12 pb-20 md:pt-24 md:pb-32 lg:min-h-[750px] bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-5 grayscale"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
      </div>

      {/* Animated Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cedra-500/10 blur-[120px] rounded-full animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-red-600/5 blur-[100px] rounded-full animate-pulse pointer-events-none" style={{ animationDelay: "2s" }}></div>

      <div className="relative z-10 max-w-7xl w-full px-4 flex flex-col items-center text-center">
        {/* Top Badges */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex flex-wrap items-center justify-center gap-3"
        >
          <StatBadge icon={<Package size={14} />} value="55K+" label={t.hero.products} />
          <StatBadge icon={<Clock size={14} />} value="24h" label={t.hero.dispatch} highlight />
          <StatBadge icon={<TrendingUp size={14} />} value="98%" label={t.hero.inStock} />
        </motion.div>

        {/* Main Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} 
          className="mb-8 md:mb-12"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white italic tracking-tighter uppercase leading-[0.85] mb-6">
            {t.hero.title1}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cedra-500 via-white to-cedra-600 animate-gradient pb-2 block">
              {t.hero.title2}
            </span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed px-4 font-medium">
            {t.hero.subtitle} <span className="text-cedra-500 font-bold">{t.hero.aiProcurement}</span> {t.hero.and} <span className="text-white font-bold underline decoration-cedra-500 underline-offset-4">{t.hero.delivery24h}</span>
          </p>
        </motion.div>

        {/* Search Bar - Enhanced */}
        <motion.form 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5, delay: 0.4 }} 
          onSubmit={handleSearch} 
          className="relative max-w-3xl w-full group mb-16 z-30 px-4 md:px-0"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-cedra-500/20 via-red-500/30 to-cedra-500/20 blur-3xl rounded-[32px] opacity-0 group-focus-within:opacity-100 transition-all duration-1000"></div>
          <div className="relative bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-2xl md:rounded-3xl p-2 flex flex-col md:flex-row items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all duration-300">
            <div className="flex items-center w-full md:w-auto px-4 py-3 md:py-0">
              <Search className="text-cedra-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder={t.hero.searchPlaceholder} 
                className="flex-1 bg-transparent border-none text-white px-4 py-2 text-lg focus:outline-none placeholder:text-zinc-500 font-medium w-full" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
            </div>
            <div className="hidden md:block w-px h-8 bg-white/10 mx-2"></div>
            <button 
              type="submit" 
              className="w-full md:w-auto bg-white text-black h-12 md:h-14 px-8 rounded-xl md:rounded-2xl font-black uppercase tracking-tighter text-sm hover:bg-cedra-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
              {t.hero.searchButton}
              <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.form>

        {/* Quick Actions - Enhanced with Staggered Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full"
        >
           <div className="flex md:justify-center overflow-x-auto snap-x snap-mandatory gap-4 pb-6 px-4 no-scrollbar -mx-4 md:mx-0">
              <QuickAction 
                icon={<MessageSquare size={20} className="text-white" />} 
                label={t.hero.requestQuote} 
                href="/quotes" 
                description={t.hero.bulkPricing} 
                delay={0.7}
              />
              <QuickAction 
                icon={<Truck size={20} className="text-white" />} 
                label={t.hero.trackOrder} 
                href="/dashboard/orders" 
                description={t.hero.realTimeTracking} 
                delay={0.8}
              />
              <QuickAction 
                icon={<UserPlus size={20} className="text-white" />} 
                label={t.hero.tradeAccount} 
                href="/register-pro" 
                description={t.hero.exclusiveBenefits} 
                badge="Pro" 
                delay={0.9}
              />
           </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatBadge({ icon, value, label, highlight }: any) {
  return (
    <div className={`px-4 py-2 rounded-full border transition-all duration-300 ${highlight ? "bg-cedra-500/10 border-cedra-500/40 text-cedra-400 shadow-[0_0_20px_rgba(230,0,35,0.15)]" : "bg-white/5 border-white/10 text-zinc-300 hover:border-white/20"} backdrop-blur-md flex items-center gap-2 group cursor-default`}>
      <span className={`${highlight ? "text-cedra-500" : "text-zinc-400 group-hover:text-white"} transition-colors`}>{icon}</span>
      <span className="font-bold text-sm tracking-tight">{value}</span>
      <span className="text-[11px] opacity-60 uppercase tracking-widest font-semibold">{label}</span>
    </div>
  );
}

function QuickAction({ icon, label, href, description, badge, delay }: any) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.a 
      href={href} 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      className="snap-center flex-shrink-0 min-w-[240px] group relative p-[1px] rounded-2xl overflow-hidden transition-all duration-300"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(230, 0, 35, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative h-full px-6 py-5 rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-white/10 group-hover:border-cedra-500/50 transition-all duration-500 flex flex-col items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-500 shadow-lg">
          {icon}
        </div>
        
        <div className="text-left w-full">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-sm font-black text-white uppercase italic tracking-tighter group-hover:text-cedra-400 transition-colors">{label}</span>
            {badge && <Badge className="bg-cedra-500 text-white text-[10px] font-bold px-2 py-0 h-5 rounded-md border-none">{badge}</Badge>}
          </div>
          <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors font-medium leading-tight block">{description}</span>
        </div>
        
        <div className="mt-auto pt-2 flex items-center text-cedra-500 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
          En savoir plus <ArrowRight size={12} className="ml-1" />
        </div>
      </div>
    </motion.a>
  );
}

// Helper for motion template
function useTemplate(strings: TemplateStringsArray, ...values: any[]) {
  return useTransform(values, (latestValues) => {
    return strings.reduce((acc, str, i) => acc + str + (latestValues[i] ?? ""), "");
  });
}
