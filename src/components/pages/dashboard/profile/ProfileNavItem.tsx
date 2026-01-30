import React from "react";

interface ProfileNavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export function ProfileNavItem({
  icon,
  label,
  active = false,
}: ProfileNavItemProps) {
  return (
    <button
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black italic uppercase tracking-tighter text-sm ${
        active
          ? "bg-cedra-500 text-white shadow-lg shadow-cedra-500/20"
          : "text-zinc-500 hover:text-white hover:bg-white/5"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
