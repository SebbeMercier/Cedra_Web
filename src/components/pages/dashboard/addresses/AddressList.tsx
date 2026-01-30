import React from "react";
import { motion } from "framer-motion";
import { MapPin, Home, Building2, Trash2 } from "lucide-react";
import { Address } from "@/types";

interface AddressListProps {
  addresses: Address[];
}

export function AddressList({ addresses }: AddressListProps) {
  if (addresses.length === 0) {
    return (
      <div className="text-center py-20 border border-white/10 rounded-[2.5rem] bg-white/5 border-dashed">
        <MapPin className="mx-auto text-white/20 mb-4" size={48} />
        <h3 className="text-white font-bold text-lg">No addresses found</h3>
        <p className="text-white/40 text-sm mt-2">
          Add a delivery location to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {addresses.map((addr) => (
        <motion.div
          key={addr.id}
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl group hover:border-red-600/30 transition-colors relative"
        >
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="text-white/20 hover:text-red-500 transition-colors">
              <Trash2 size={16} />
            </button>
          </div>

          <div className="mb-4">
            {addr.company ? (
              <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mb-3">
                <Building2 size={20} />
              </div>
            ) : (
              <div className="w-10 h-10 bg-red-600/10 text-red-600 rounded-full flex items-center justify-center mb-3">
                <Home size={20} />
              </div>
            )}
            <h3 className="text-white font-bold text-lg">{addr.name}</h3>
            <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">
              {addr.recipient_name}
            </p>
          </div>

          <div className="space-y-1 text-sm text-white/70 leading-relaxed font-medium">
            <p>
              {addr.street} {addr.number} {addr.box}
            </p>
            <p>
              {addr.postal_code} {addr.city}
            </p>
            <p className="text-white/40">{addr.country}</p>
          </div>

          {(addr.email || addr.phone) && (
            <div className="mt-4 pt-4 border-t border-white/5 space-y-1">
              {addr.email && (
                <p className="text-[10px] text-white/40 truncate">
                  {addr.email}
                </p>
              )}
              {addr.phone && (
                <p className="text-[10px] text-white/40">{addr.phone}</p>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
