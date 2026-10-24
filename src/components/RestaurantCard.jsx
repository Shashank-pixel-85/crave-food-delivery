import { motion } from "framer-motion";
import { ArrowUpRight, Clock3, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function RestaurantCard({ restaurant, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group overflow-hidden rounded-[24px] border border-orange-100 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <Link to={`/restaurant/${restaurant.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
          <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[11px] font-extrabold tracking-wide text-orange shadow-sm">{restaurant.offer}</span>
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1.5 text-xs font-bold text-ink">
            <Clock3 size={13} /> {restaurant.time}
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-extrabold text-ink">{restaurant.name}</h3>
              <p className="mt-1 text-sm text-muted">{restaurant.cuisine}</p>
            </div>
            <ArrowUpRight size={19} className="mt-1 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange" />
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-orange-50 pt-3 text-sm">
            <span className="flex items-center gap-1 font-bold text-ink"><Star size={15} className="fill-amber-400 text-amber-400" /> {restaurant.rating}</span>
            <span className="text-muted">{restaurant.fee === 0 ? "Free delivery" : `₹${restaurant.fee} delivery`}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
