import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock3, Star, Bike, Check } from "lucide-react";
import { restaurants as starterRestaurants, menuItems as starterMenuItems } from "../data";
import { useCart } from "../context/CartContext";
import MenuItem from "../components/MenuItem";

export default function Restaurant() {
  const { id } = useParams();
  const [restaurants] = useState(() => {
    try {
      const saved = localStorage.getItem("crave-admin-restaurants");
      return saved ? JSON.parse(saved) : starterRestaurants;
    } catch {
      return starterRestaurants;
    }
  });
  const [menuItems] = useState(() => {
    try {
      const saved = localStorage.getItem("crave-admin-menu");
      return saved ? JSON.parse(saved) : starterMenuItems;
    } catch {
      return starterMenuItems;
    }
  });
  const restaurant = restaurants.find((item) => String(item.id) === String(id));
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState("All");
  const [addedName, setAddedName] = useState("");

  const menu = useMemo(() => menuItems.filter((item) => String(item.restaurantId) === String(id)), [id, menuItems]);
  const filters = ["All", ...new Set(menu.map((item) => item.category))];
  const visibleMenu = menu.filter((item) => activeFilter === "All" || item.category === activeFilter);

  function handleAdd(item) {
    addToCart(item, { restaurantName: restaurant.name });
    setAddedName(item.name);
    window.setTimeout(() => setAddedName(""), 1200);
  }

  if (!restaurant) {
    return <main className="page-wrap py-20 text-center"><h1 className="text-2xl font-black">Restaurant not found</h1><Link to="/" className="mt-4 inline-block font-bold text-orange">Back home</Link></main>;
  }

  return (
    <main className="page-wrap py-8 md:py-10">
      <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-muted transition hover:text-orange"><ArrowLeft size={17} /> All restaurants</Link>
      <div className="overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-soft">
        <div className="relative h-56 sm:h-72">
          <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          <span className="absolute bottom-5 left-5 rounded-full bg-orange px-3 py-1.5 text-xs font-extrabold text-white">{restaurant.offer}</span>
          <h1 className="absolute bottom-14 left-5 text-3xl font-black text-white sm:text-4xl">{restaurant.name}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 p-5 text-sm text-muted sm:p-6">
          <span>{restaurant.cuisine}</span><span className="flex items-center gap-1 font-bold text-ink"><Star size={15} className="fill-amber-400 text-amber-400" /> {restaurant.rating}</span><span className="flex items-center gap-1"><Clock3 size={16} /> {restaurant.time}</span><span className="flex items-center gap-1"><Bike size={16} /> {restaurant.fee ? `₹${restaurant.fee} delivery` : "Free delivery"}</span>
          <p className="basis-full text-sm leading-6">{restaurant.description}</p>
        </div>
      </div>

      <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_290px]">
        <section>
          <div className="mb-5"><p className="eyebrow">MADE FRESH FOR YOU</p><h2 className="section-title mt-1">The menu</h2></div>
          <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${activeFilter === filter ? "bg-ink text-white" : "border border-orange-100 bg-white text-muted hover:border-orange-200 hover:text-orange"}`}>{filter}</button>)}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {visibleMenu.map((item) => <MenuItem key={item.id} item={item} onAdd={handleAdd} />)}
          </div>
          {addedName && <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white shadow-xl"><Check size={17} className="text-green-300" /> {addedName} added to cart</div>}
        </section>
        <aside className="h-fit rounded-2xl border border-orange-100 bg-white p-5 shadow-soft lg:sticky lg:top-24">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-peach text-2xl">🛍️</div>
          <h3 className="mt-4 text-lg font-extrabold">Your order, your way</h3>
          <p className="mt-2 text-sm leading-6 text-muted">Add favourites to your cart. You can review quantities and checkout whenever you're ready.</p>
          <Link to="/cart" className="mt-5 flex w-full items-center justify-center rounded-xl bg-orange px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#db5931]">View cart</Link>
        </aside>
      </div>
    </main>
  );
}
