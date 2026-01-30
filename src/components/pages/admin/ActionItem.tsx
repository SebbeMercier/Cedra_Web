import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp } from "lucide-react";

interface ActionItemProps {
  title: string;
  desc: string;
  severity: "high" | "medium" | "low";
}

export function ActionItem({ title, desc, severity }: ActionItemProps) {
  const colors = {
    high: "border-cedra-500/50 bg-cedra-500/5",
    medium: "border-yellow-600/30 bg-yellow-600/5",
    low: "border-blue-600/30 bg-blue-600/5",
  };

  return (
    <motion.div
      whileHover={{ x: 10 }}
      className={`p-6 rounded-3xl border ${colors[severity]} transition-all flex items-start gap-4 backdrop-blur-md shadow-xl`}
    >
      <div className="mt-1">
        {severity === "high" ? (
          <AlertTriangle className="text-cedra-500" size={20} />
        ) : (
          <TrendingUp className="text-white/40" size={20} />
        )}
      </div>
      <div>
        <h4 className="font-bold text-white mb-1">{title}</h4>
        <p className="text-xs text-white/50 leading-relaxed font-medium">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}
