import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Utensils, Clock3, LayoutDashboard } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-orange-100/80 bg-cream/95 backdrop-blur">
      <div className="page-wrap flex h-[76px] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Crave home">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-orange text-white shadow-md shadow-orange/20">
            <Utensils size={21} />
          </span>
          <span className="text-[25px] font-extrabold tracking-tight text-ink">crave<span className="text-orange">.</span></span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-muted md:flex">
          <NavLink to="/" end className={({ isActive }) => isActive ? "text-orange" : "transition hover:text-orange"}>Discover</NavLink>
          <a href="/#restaurants" className="transition hover:text-orange">Restaurants</a>
          <NavLink to="/orders" className={({ isActive }) => isActive ? "text-orange" : "transition hover:text-orange"}>My orders</NavLink>
          <NavLink to="/admin" className={({ isActive }) => isActive ? "text-orange" : "transition hover:text-orange"}>Admin</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/orders" className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-muted transition hover:bg-white sm:flex">
            <Clock3 size={17} /> Orders
          </Link>
          <Link to="/admin" className="hidden items-center gap-2 rounded-full border border-orange-100 bg-white px-3 py-2 text-sm font-bold text-muted transition hover:text-orange sm:flex">
            <LayoutDashboard size={16} /> Admin
          </Link>
          <Link to="/cart" className="relative flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange">
            <ShoppingBag size={17} />
            <span className="hidden sm:inline">My cart</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-orange px-1 text-[11px]">{itemCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
