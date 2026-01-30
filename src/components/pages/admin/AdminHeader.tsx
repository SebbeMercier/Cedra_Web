import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, ListTree, Box, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
  const router = useRouter();

  return (
    <header className="mb-12 flex items-end justify-between">
      <div>
        <div className="flex items-center gap-2 text-cedra-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
          <Zap size={14} />
          <span>System Administrator</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black font-outfit tracking-tighter italic uppercase text-white">
          Global <span className="text-cedra-500">Overview</span>
        </h1>
      </div>
      <div className="flex gap-4">
        <Link href="/admin/categories">
          <Button
            variant="outline"
            className="rounded-xl h-12 border-white/10 hover:bg-white/10 text-white transition-all uppercase text-[10px] font-bold tracking-widest px-6"
          >
            <ListTree size={16} className="mr-2" /> Categories
          </Button>
        </Link>
        <Link href="/admin/products">
          <Button
            variant="outline"
            className="rounded-xl h-12 border-white/10 hover:bg-white/10 text-white transition-all uppercase text-[10px] font-bold tracking-widest px-6"
          >
            <Box size={16} className="mr-2" /> Inventory
          </Button>
        </Link>
        <Link href="/admin/products/new">
          <Button className="bg-white text-black hover:bg-cedra-500 hover:text-white transition-all rounded-xl px-6 font-bold uppercase tracking-widest text-[10px] h-12">
            <Plus size={16} className="mr-2" /> Add Asset
          </Button>
        </Link>
        <Button
          variant="outline"
          className="rounded-xl h-12 border-white/10 hover:bg-white/10 text-white transition-all uppercase text-[10px] font-bold tracking-widest px-6"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
