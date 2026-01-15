"use client";

import React from "react";
import ProductCard from "@/components/products/ProductCard";
import { ChevronRight, ArrowRight, Zap, ShoppingBag, CreditCard, Ship, Hammer, Lightbulb, Power } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const FEATURED_PROMOS = [
  {
    id: "promo-1",
    title: "Winter Trade Inventory Sale",
    badge: "Promotion",
    desc: "Up to 45% off on industrial breakers and circuit protection for Q1 projects.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800",
    button: "View Discounted Catalog",
    color: "bg-red-600"
  },
  {
    id: "promo-2",
    title: "Cedra Outlet Live",
    badge: "Online Exclusive",
    desc: "Premium warehouse clearance. Limited quantities on lighting and switchgear.",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800",
    button: "Explore Clearance",
    color: "bg-zinc-800"
  },
  {
    id: "promo-3",
    title: "Sustainable Power",
    badge: "New Solutions",
    desc: "Discover our full range of solar and EV charging infrastructure.",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800",
    button: "Go Green",
    color: "bg-zinc-900"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black pt-[148px]">

      {/* 4. Bento Hero Grid (Cebeo inspired layout) */}
      <main className="max-w-[1500px] mx-auto px-6 py-10 w-full space-y-12">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PROMOS.map((promo, idx) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden flex flex-col group hover:shadow-[0_20px_60px_-15px_rgba(255,0,0,0.2)] transition-all duration-500 border border-transparent hover:border-red-600/20"
            >
              <div className="h-[280px] relative overflow-hidden">
                <img src={promo.image} alt={promo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent"></div>

                {/* Promo Overlay Content */}
                <div className="absolute bottom-8 left-8 right-8">
                  <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none mb-2">
                    {promo.title.split(' ')[0]} <br />
                    <span className="text-red-500">{promo.title.split(' ').slice(1).join(' ')}</span>
                  </h2>
                </div>
              </div>

              <div className="p-10 flex flex-col flex-1 bg-white">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-zinc-100 rounded-lg text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    {promo.badge}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-black leading-tight mb-4 group-hover:text-red-600 transition-colors uppercase italic tracking-tighter">
                  {promo.title}
                </h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed mb-8 line-clamp-2">
                  {promo.desc}
                </p>
                <div className="mt-auto">
                  <Link
                    href="/products"
                    className={`inline-flex items-center gap-2 ${promo.color} text-white px-8 py-3.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-red-500/10`}
                  >
                    {promo.button} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Categories Icon Bar */}
        <section className="bg-zinc-950 p-6 rounded-[2.5rem] border border-white/5 flex items-center justify-between overflow-x-auto no-scrollbar gap-8">
          <CategoryIcon icon={<Zap className="text-red-600" />} label="Circuit Protection" />
          <CategoryIcon icon={<Lightbulb className="text-red-600" />} label="Lighting" />
          <CategoryIcon icon={<Power className="text-red-600" />} label="Switchgear" />
          <CategoryIcon icon={<Ship className="text-red-600" />} label="Smart Home" />
          <CategoryIcon icon={<Hammer className="text-red-600" />} label="Industrial Tools" />
          <CategoryIcon icon={<CreditCard className="text-red-600" />} label="B2B Financing" />
        </section>

        {/* Backend Performance Stats (DaisyUI) */}
        <section className="stats shadow-2xl bg-zinc-950 border border-white/5 w-full rounded-[2.5rem] overflow-hidden">
          <div className="stat place-items-center">
            <div className="stat-title text-[10px] font-black uppercase tracking-widest text-white/30">API Latency</div>
            <div className="stat-value text-red-600 font-outfit italic">0.8ms</div>
            <div className="stat-desc text-[9px] font-bold text-green-500 uppercase tracking-tighter">FastHTTP Engine</div>
          </div>

          <div className="stat place-items-center border-l border-white/5">
            <div className="stat-title text-[10px] font-black uppercase tracking-widest text-white/30">DB Throughput</div>
            <div className="stat-value text-white font-outfit italic">1.2M</div>
            <div className="stat-desc text-[9px] font-bold text-white/20 uppercase tracking-tighter">ScyllaDB Nodes</div>
          </div>

          <div className="stat place-items-center border-l border-white/5">
            <div className="stat-title text-[10px] font-black uppercase tracking-widest text-white/30">AI Concurrency</div>
            <div className="stat-value text-white font-outfit italic">450</div>
            <div className="stat-desc text-[9px] font-bold text-white/20 uppercase tracking-tighter">Ollama Instances</div>
          </div>
        </section>

        {/* Inventory Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Best <span className="text-red-600">Sellers</span></h2>
              <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] mt-1">High Velocity Inventory</p>
            </div>
            <Link href="/products" className="text-white/40 hover:text-red-600 font-extrabold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 group transition-all">
              View All <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard id="1" name="Resi9 Load Center - 12 Ways" price={145.00} category="Breakers" sku="CD-R9-012" />
            <ProductCard id="2" name="LED IP65 Batten 1500mm" price={42.50} category="Lighting" sku="CD-IP65-15" />
            <ProductCard id="3" name="Floor Socket Plate - Brass" price={29.99} category="Switchgear" sku="CD-FLR-BRS" />
            <ProductCard id="4" name="Industrial Comms Cabinet 12U" price={289.00} category="Enterprise" sku="CD-NET-12U" />
          </div>
        </section>

        {/* Trade Portal CTA */}
        <section className="bg-red-600 rounded-[3rem] p-16 flex flex-col items-center text-center relative overflow-hidden group shadow-2xl shadow-red-600/20">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-black/10 -skew-x-12 translate-x-1/2"></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-5xl font-black text-white mb-6 tracking-tighter uppercase italic leading-none">Ready to scale your <br /> electrical business?</h2>
            <p className="text-white/90 text-xl mb-10 font-bold">Unbeatable bulk discounts and a dedicated technical account manager for trade partners.</p>
            <button className="bg-black text-white px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all shadow-black/40 shadow-2xl">
              Create Trade Account In 2 Minutes
            </button>
          </div>
        </section>

      </main>

      {/* Industrial Footer */}
      <footer className="bg-zinc-950 text-white pt-24 pb-12 px-6 mt-12 border-t border-white/5">
        <div className="max-w-[1500px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-left mb-24">
            <FooterCol title="Supply Chain" links={['Inventory Status', 'Lead Times', 'Sustainability']} />
            <FooterCol title="Orders" links={['Track Dispatch', 'Invoices', 'Returns Policy']} />
            <FooterCol title="Partners" links={['Vendor Login', 'Wholesale API', 'Peppol Invoicing']} />
            <FooterCol title="Technical" links={['API Specs', 'Ollama AI Help', 'Safety Data']} />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
            <div className="flex items-center space-x-2 h-12 w-32 relative">
              <img
                src="/logo.png"
                alt="Cedra"
                className="h-full w-full object-contain filter brightness-200"
              />
            </div>
            <p className="text-white/20 text-[9px] tracking-[0.4em] uppercase font-black text-center">
              © 2026 CEDRA TECHNOLOGIES. POWERING THE FUTURE OF THE TRADE.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CategoryIcon({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex items-center gap-3 group whitespace-nowrap">
      <div className="w-12 h-12 bg-black rounded-xl border border-white/5 flex items-center justify-center group-hover:bg-red-600 transition-all duration-300 group-hover:scale-110">
        <span className="group-hover:text-white transition-colors">{icon}</span>
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-white/50 group-hover:text-white">{label}</span>
    </button>
  );
}

function FooterCol({ title, links }: { title: string, links: string[] }) {
  return (
    <div className="space-y-8">
      <h4 className="font-black text-xs tracking-[0.3em] uppercase text-red-600">{title}</h4>
      <ul className="space-y-4">
        {links.map((l, i) => (
          <li key={i}><a href="#" className="text-white/40 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}
