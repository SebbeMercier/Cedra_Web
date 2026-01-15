"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Search, Menu, X, MapPin, Zap, Bell, ChevronDown, Package, Plus, Hammer, Lightbulb, Power } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { itemCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            {/* 1. Alert Banner */}
            <div className="bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] py-2 px-6 flex items-center justify-center gap-3 shadow-xl z-20 relative">
                <Bell size={12} className="animate-pulse" />
                <span>Next-day delivery available for all orders placed before 17:00</span>
            </div>

            {/* 2. Main Navbar Layer */}
            <div className={cn(
                "h-20 flex items-center px-6 gap-6 transition-all duration-300 border-b border-white/5",
                isScrolled ? "bg-black/80 backdrop-blur-xl h-16" : "bg-black"
            )}>
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 mr-4 shrink-0 px-2 h-16 w-38 relative">
                    <img
                        src="/logo.png"
                        alt="Cedra"
                        className="h-full w-full object-contain filter brightness-200"
                    />
                </Link>

                {/* Departments Dropdown (Shadcn UI) */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="hidden lg:flex gap-2 bg-white text-black hover:bg-red-600 hover:text-white border-0 px-6">
                            <Menu size={16} />
                            <span>Departments</span>
                            <ChevronDown size={14} className="opacity-40" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64">
                        <DropdownMenuLabel>Product Categories</DropdownMenuLabel>
                        <DropdownMenuItem className="flex items-center gap-2">
                            <Zap size={14} className="text-red-600" /> Circuit Protection
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                            <Lightbulb size={14} className="text-red-600" /> Lighting Solutions
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                            <Power size={14} className="text-red-600" /> Sockets & Switches
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                            <Hammer size={14} className="text-red-600" /> Industrial Tools
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 font-black">View All Catalog</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Massive Search Bar */}
                <div className="flex-1 flex items-center max-w-3xl group relative">
                    <div className="flex-1 relative flex items-center bg-zinc-900 rounded-full border border-white/10 overflow-hidden focus-within:border-red-600/50 transition-all px-2">
                        <input
                            type="text"
                            placeholder="Search 50,000+ products (e.g. Disjoncteur, Cable 3G1.5, ...)"
                            className="w-full py-3 px-4 bg-transparent text-white text-sm focus:outline-none placeholder:text-zinc-700 font-medium"
                        />
                        <button className="text-zinc-600 hover:text-red-600 px-4 transition-all">
                            <Search size={18} />
                        </button>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4 shrink-0">
                    {/* Quick Order Dialog (Shadcn UI) */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="hidden xl:flex gap-2 border-red-600/20 text-red-600 hover:bg-red-600 hover:text-white">
                                <Plus size={16} /> Quick Order
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Quick Inventory Submittal</DialogTitle>
                                <DialogDescription>Enter SKU or part number for immediate ScyllaDB batch process.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="flex gap-2">
                                    <input className="flex-1 bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-sm" placeholder="e.g. CD-BKR-3P" />
                                    <input className="w-20 bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-sm text-center" placeholder="Qty" />
                                </div>
                                <Button className="w-full py-4 text-xs">Add to Project Batch</Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Link href="/locations" className="hidden xl:flex flex-col items-center text-white/40 hover:text-red-500 transition-all gap-0.5">
                        <MapPin size={18} />
                        <span className="text-[8px] font-black uppercase tracking-widest">Branches</span>
                    </Link>

                    <Link href="/login">
                        <Button variant="default" className="hidden sm:flex px-8">
                            Sign In
                        </Button>
                    </Link>

                    <Link href="/cart" className="relative p-2 text-white hover:text-red-600 transition-colors">
                        <ShoppingCart size={24} strokeWidth={2} />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black border border-black shadow-xl">
                                {itemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* 3. Navigation Links Layer */}
            <div className="bg-zinc-950 h-11 flex items-center px-6 gap-8 overflow-x-auto no-scrollbar border-b border-white/10">
                <SubNavLink href="/" isActive>Home</SubNavLink>
                <SubNavLink href="/products?cat=Promotions">Flash Deals</SubNavLink>
                <SubNavLink href="/expertises">Expertise</SubNavLink>
                <SubNavLink href="/dashboard" className="text-red-600 font-black animate-pulse flex items-center gap-1.5 ml-auto">
                    <Zap size={12} /> AI Dashboard
                </SubNavLink>
            </div>
        </nav>
    );
}

function SubNavLink({ href, children, className, isActive = false }: { href: string; children: React.ReactNode; className?: string; isActive?: boolean }) {
    return (
        <Link
            href={href}
            className={cn(
                "text-[10px] font-black uppercase tracking-[0.2em] px-2 h-full flex items-center transition-all whitespace-nowrap border-b-2",
                isActive ? "text-white border-red-600" : "text-white/40 border-transparent hover:text-white hover:border-white/20",
                className
            )}
        >
            {children}
        </Link>
    );
}
