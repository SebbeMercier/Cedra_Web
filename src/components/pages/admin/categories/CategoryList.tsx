import React from "react";
import { motion } from "framer-motion";
import { Tag, CornerDownRight, Trash2 } from "lucide-react";

interface CategoryItemProps {
  cat: any;
  depth: number;
  index: number;
  locale: string;
}

export function CategoryItem({
  cat,
  depth,
  index,
  locale,
}: CategoryItemProps) {
  const displayName =
    typeof cat.name === "object"
      ? cat.name[locale] ||
        cat.name["fr"] ||
        cat.name["en"] ||
        cat.slug ||
        cat.id
      : cat.name || cat.slug || cat.id;

  return (
    <div className="space-y-2">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 + depth * 0.1 }}
        style={{ marginLeft: `${depth * 24}px` }}
        className={`bg-white/[0.03] border border-white/5 p-4 rounded-2xl flex items-center justify-between group hover:border-cedra-500/30 transition-all ${depth > 0 ? "bg-white/[0.01]" : ""}`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${depth === 0 ? "bg-cedra-500/10 text-cedra-500" : "bg-white/5 text-white/20"}`}
          >
            {depth === 0 ? <Tag size={14} /> : <CornerDownRight size={14} />}
          </div>
          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              {displayName}
              {"sub_categories" in cat &&
                cat.sub_categories &&
                cat.sub_categories.length > 0 && (
                  <span className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-white/40">
                    {cat.sub_categories.length}
                  </span>
                )}
            </div>
            <div className="text-[9px] text-white/20 font-mono">
              ID: {cat.id}
            </div>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="text-white/20 hover:text-red-500 transition-colors p-2">
            <Trash2 size={14} />
          </button>
        </div>
      </motion.div>

      {"sub_categories" in cat &&
        cat.sub_categories &&
        cat.sub_categories.length > 0 && (
          <div className="space-y-2">
            {cat.sub_categories.map((child: any, idx: number) => (
              <CategoryItem
                key={child.id}
                cat={child}
                depth={depth + 1}
                index={idx}
                locale={locale}
              />
            ))}
          </div>
        )}
    </div>
  );
}

interface CategoryListProps {
  categories: any[];
  locale: string;
}

export function CategoryList({ categories, locale }: CategoryListProps) {
  return (
    <div className="md:col-span-2">
      <div className="space-y-4">
        {categories.map((cat, i) => (
          <CategoryItem
            key={cat.id}
            cat={cat}
            depth={0}
            index={i}
            locale={locale}
          />
        ))}
        {categories.length === 0 && (
          <div className="py-20 text-center text-white/20 border border-dashed border-white/10 rounded-3xl">
            No categories found.
          </div>
        )}
      </div>
    </div>
  );
}
