import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface SalesChartProps {
  summary: any;
}

export function SalesChart({ summary }: SalesChartProps) {
  return (
    <div className="bg-white/2 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden group shadow-2xl">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cedra-500/5 blur-3xl rounded-full"></div>
      <h3 className="text-xl font-bold mb-8 text-white flex items-center gap-3">
        <TrendingUp className="text-cedra-500" />
        Sales By Category
      </h3>

      <div className="space-y-4">
        {Object.entries(summary?.sales_by_category || {}).map(
          ([category, amount], i) => (
            <div key={category} className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-white uppercase tracking-wider">
                <span>{category}</span>
                <span>€{(amount as number).toLocaleString()}</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((amount as number) / (summary?.total_sales_amount || 1)) * 100}%`,
                  }}
                  transition={{ delay: i * 0.1, duration: 1 }}
                  className="h-full bg-cedra-500"
                />
              </div>
            </div>
          ),
        )}
        {Object.keys(summary?.sales_by_category || {}).length === 0 && (
          <p className="text-white/40 text-sm italic">
            No sales data available yet.
          </p>
        )}
      </div>
    </div>
  );
}
