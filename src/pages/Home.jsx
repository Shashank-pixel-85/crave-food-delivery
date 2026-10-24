import { useMemo, useState } from "react";
import { ArrowRight, Search, Sparkles, MapPin, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categories, restaurants as starterRestaurants } from "../data";
import RestaurantCard from "../components/RestaurantCard";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [restaurants] = useState(() => {
    try {
      const saved = localStorage.getItem("crave-admin-restaurants");
      return saved ? JSON.parse(saved) : starterRestaurants;
    } catch {
      return starterRestaurants;
    }
  });

  const filteredRestaurants = useMemo(() => restaurants.filter((restaurant) => {
    const matchesCategory = activeCategory === "All" || restaurant.category === activeCategory;
    const query = search.toLowerCase().trim();
    const matchesSearch = !query || `${restaurant.name} ${restaurant.cuisine} ${restaurant.category}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  }), [activeCategory, search]);

  return (
    <main>
      <section className="page-wrap pb-12 pt-8 md:pb-16 md:pt-12">
        <div className="hero-panel relative overflow-hidden rounded-[32px] bg-[#25231f] px-6 py-10 text-white sm:px-10 md:px-14 md:py-14">
          <div className="relative z-10 max-w-[570px]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-orange-100">
              <Sparkles size={14} /> GOOD FOOD. GOOD MOOD.
            </div>
            <h1 className="max-w-[520px] text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl md:text-[62px]">Your cravings,<br /> <span className="text-[#ff9b73]">delivered.</span></h1>
            <p className="mt-5 max-w-[430px] text-sm leading-6 text-white/65 sm:text-base">The good stuff is closer than you think. Find your next favourite meal from the best spots around you.</p>
            <a href="#restaurants" className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange/20 transition hover:bg-[#ff8158]">Explore restaurants <ArrowRight size={17} /></a>
          </div>
          <div className="hero-food absolute -right-5 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 overflow-hidden rounded-full border-[18px] border-white/5 lg:block">
            <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85" alt="Colourful meal bowl" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-orange/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/3 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />
        </div>

        <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-orange-100 bg-white p-3 shadow-soft sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
            <Search size={20} className="shrink-0 text-orange" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search restaurants or cuisines..." className="w-full bg-transparent py-2 text-sm text-ink outline-none placeholder:text-muted" />
          </div>
          <div className="hidden h-8 w-px bg-orange-100 sm:block" />
          <div className="flex items-center gap-2 px-3 text-sm text-muted"><MapPin size={17} className="text-orange" /> Delivering to <strong className="text-ink">Your location</strong></div>
        </div>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between">
            <div><p className="eyebrow">WHAT ARE YOU IN THE MOOD FOR?</p><h2 className="section-title mt-1">Explore by category</h2></div>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {categories.map((category) => (
              <button key={category.name} onClick={() => setActiveCategory(category.name)} className={`category-chip ${activeCategory === category.name ? "category-active" : ""}`}>
                <span className="text-2xl">{category.emoji}</span><span className="mt-2 text-xs font-bold sm:text-sm">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section id="restaurants" className="mt-12 scroll-mt-24">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div><p className="eyebrow">CURATED FOR YOUR CRAVINGS</p><h2 className="section-title mt-1">Popular near you</h2><p className="mt-2 text-sm text-muted">Tasty picks, delivered with love.</p></div>
            <span className="hidden items-center gap-1 text-sm font-bold text-orange sm:flex">{filteredRestaurants.length} places <ChevronRight size={17} /></span>
          </div>
          {filteredRestaurants.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRestaurants.map((restaurant, index) => <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index} />)}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-orange-200 bg-white p-10 text-center">
              <div className="text-4xl">🔎</div><h3 className="mt-3 font-extrabold">No restaurants found</h3><p className="mt-1 text-sm text-muted">Try another search or category.</p>
              <button onClick={() => { setSearch(""); setActiveCategory("All"); }} className="mt-4 font-bold text-orange">Clear filters</button>
            </div>
          )}
        </section>

        <section className="mt-12 flex flex-col items-start justify-between gap-5 rounded-[28px] bg-[#fce8dc] p-7 sm:flex-row sm:items-center sm:p-9">
          <div><p className="eyebrow">A LITTLE SOMETHING EXTRA</p><h2 className="mt-2 text-2xl font-black text-ink sm:text-3xl">Make tonight delicious.</h2><p className="mt-2 text-sm text-muted">Your next comfort-food moment is just a few taps away.</p></div>
          <Link to="/cart" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-extrabold text-white transition hover:bg-orange">Go to cart <ArrowRight size={16} /></Link>
        </section>
      </section>
    </main>
  );
}
