import { Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function MenuItem({ item, onAdd }) {
  return (
    <motion.div layout className="flex gap-4 rounded-2xl border border-orange-100 bg-white p-4 transition hover:border-orange-200 hover:shadow-soft">
      <div className="grid h-[76px] w-[76px] shrink-0 place-items-center rounded-2xl bg-peach text-4xl">{item.emoji}</div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-extrabold text-ink">{item.name}</h3>
          {item.popular && <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-green">Popular</span>}
        </div>
        <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted">{item.description}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="font-extrabold text-ink">₹{item.price}</span>
          <button onClick={() => onAdd(item)} className="flex h-9 items-center gap-1.5 rounded-xl border border-orange-200 px-3 text-sm font-bold text-orange transition hover:bg-orange hover:text-white" aria-label={`Add ${item.name} to cart`}>
            <Plus size={16} /> Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
