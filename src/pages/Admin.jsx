import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import {
  LayoutDashboard, ShoppingBag, Utensils, Users, TrendingUp, Search, Plus,
  Pencil, Trash2, X, Check, PackageCheck, Bike, Wallet, TicketPercent,
  Headset, FileBarChart, Settings, Download, Save, IndianRupee,
  Clock3
} from "lucide-react";
import { restaurants as starterRestaurants, menuItems as starterMenu } from "../data";

const starterOrders = [
  { id: "CR1048201", date: new Date().toLocaleString("en-IN"), customer: "Aarav Sharma", email: "aarav@example.com", phone: "+91 98765 43210", address: "Indiranagar, Bengaluru", payment: "UPI (demo)", status: "Preparing", total: 687, items: [{ name: "Margherita Pizza", quantity: 2, price: 249, emoji: "🍕" }, { name: "Garlic Knots", quantity: 1, price: 129, emoji: "🥖" }] },
  { id: "CR1048202", date: new Date().toLocaleString("en-IN"), customer: "Priya Nair", email: "priya@example.com", phone: "+91 98765 43211", address: "HSR Layout, Bengaluru", payment: "Cash on delivery", status: "Out for delivery", total: 458, items: [{ name: "District Smash Burger", quantity: 1, price: 279, emoji: "🍔" }, { name: "Loaded Fries", quantity: 1, price: 149, emoji: "🍟" }] }
];
const orderStatuses = ["Confirmed", "Preparing", "Out for delivery", "Delivered", "Cancelled"];
const starterPartners = [
  { id: "DP-101", name: "Rohan Kumar", phone: "+91 98765 12001", zone: "Indiranagar", status: "Available", deliveries: 128 },
  { id: "DP-102", name: "Sneha Reddy", phone: "+91 98765 12002", zone: "HSR Layout", status: "On delivery", deliveries: 96 },
  { id: "DP-103", name: "Arjun Rao", phone: "+91 98765 12003", zone: "Koramangala", status: "Available", deliveries: 174 }
];
const starterPromotions = [
  { id: "CRAVE10", title: "First order offer", discount: "10% off", code: "CRAVE10", status: "Active", uses: 42 },
  { id: "WELCOME50", title: "Welcome offer", discount: "₹50 off", code: "WELCOME50", status: "Active", uses: 19 }
];
const starterTickets = [
  { id: "SUP-201", customer: "Priya Nair", subject: "Order arrived late", priority: "Normal", status: "Open", orderId: "CR1048202" },
  { id: "SUP-202", customer: "Aarav Sharma", subject: "Need invoice for order", priority: "Low", status: "In progress", orderId: "CR1048201" }
];
const starterSettings = { storeName: "Crave", supportEmail: "support@crave.demo", supportPhone: "+91 80000 00000", deliveryFee: "25", taxRate: "5", currency: "INR", acceptingOrders: true };

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}
function persist(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage may be unavailable */ }
}
function StatCard({ label, value, note, icon: Icon }) {
  return <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-soft"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-muted">{label}</p><p className="mt-2 text-2xl font-black tracking-tight text-ink">{value}</p><p className="mt-2 text-xs font-semibold text-green">{note}</p></div><div className="grid h-11 w-11 place-items-center rounded-xl bg-peach text-orange"><Icon size={20} /></div></div></div>;
}
function StatusPill({ status }) {
  const styles = status === "Delivered" || status === "Active" || status === "Available" || status === "Resolved" ? "bg-green-50 text-green" : status === "Cancelled" || status === "Inactive" ? "bg-red-50 text-red-600" : "bg-peach text-orange";
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold ${styles}`}>{status || "Confirmed"}</span>;
}
function EmptyState({ message }) { return <div className="mt-4 rounded-xl border border-dashed border-orange-200 bg-cream p-8 text-center text-sm text-muted">{message}</div>; }
function Panel({ children }) { return <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-soft">{children}</div>; }
function PanelHeading({ title, description, action }) { return <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><h2 className="text-lg font-extrabold">{title}</h2>{description && <p className="mt-1 text-sm text-muted">{description}</p>}</div>{action}</div>; }

export default function Admin() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [orders, setOrders] = useState(() => readStorage("crave-orders", starterOrders));
  const [restaurantList, setRestaurantList] = useState(() => readStorage("crave-admin-restaurants", starterRestaurants));
  const [menuList, setMenuList] = useState(() => readStorage("crave-admin-menu", starterMenu));
  const [partners, setPartners] = useState(() => readStorage("crave-admin-partners", starterPartners));
  const [promotions, setPromotions] = useState(() => readStorage("crave-admin-promotions", starterPromotions));
  const [tickets, setTickets] = useState(() => readStorage("crave-admin-tickets", starterTickets));
  const [settings, setSettings] = useState(() => ({ ...starterSettings, ...readStorage("crave-admin-settings", {}) }));
  const [orderSearch, setOrderSearch] = useState("");
  const [restaurantSearch, setRestaurantSearch] = useState("");
  const [menuSearch, setMenuSearch] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [showRestaurantForm, setShowRestaurantForm] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [promotionFormOpen, setPromotionFormOpen] = useState(false);
  const [promotionForm, setPromotionForm] = useState({ title: "", code: "", discount: "10% off" });
  const [menuForm, setMenuForm] = useState({ restaurantId: String(starterRestaurants[0]?.id || "1"), name: "", description: "", price: "", category: "Pizza", emoji: "🍽️", popular: false });
  const [restaurantForm, setRestaurantForm] = useState({ name: "", cuisine: "", category: "Pizza", rating: "4.5", time: "20–30 min", fee: "25", offer: "10% OFF", image: "", description: "" });
  const [notice, setNotice] = useState("");

  useEffect(() => persist("crave-admin-restaurants", restaurantList), [restaurantList]);
  useEffect(() => persist("crave-admin-menu", menuList), [menuList]);
  useEffect(() => persist("crave-admin-partners", partners), [partners]);
  useEffect(() => persist("crave-admin-promotions", promotions), [promotions]);
  useEffect(() => persist("crave-admin-tickets", tickets), [tickets]);
  useEffect(() => persist("crave-admin-settings", settings), [settings]);

  const deliveredRevenue = useMemo(() => orders.filter((order) => order.status === "Delivered").reduce((sum, order) => sum + Number(order.total || 0), 0), [orders]);
  const totalRevenue = useMemo(() => orders.filter((order) => order.status !== "Cancelled").reduce((sum, order) => sum + Number(order.total || 0), 0), [orders]);
  const customers = useMemo(() => {
    const unique = new Map();
    orders.forEach((order) => {
      const key = (order.email || order.customer || "Guest").toLowerCase();
      const current = unique.get(key) || { name: order.customer || "Guest", email: order.email || "Not provided", phone: order.phone || "Not provided", orders: 0, spent: 0, lastOrder: order.date || "—" };
      current.orders += 1;
      current.spent += Number(order.total || 0);
      if (current.lastOrder === "—" && order.date) current.lastOrder = order.date;
      unique.set(key, current);
    });
    return [...unique.values()];
  }, [orders]);
  const visibleOrders = orders.filter((order) => { const search = orderSearch.toLowerCase().trim(); return !search || `${order.id} ${order.customer || ""} ${order.status}`.toLowerCase().includes(search); });
  const visibleRestaurants = restaurantList.filter((restaurant) => { const search = restaurantSearch.toLowerCase().trim(); return !search || `${restaurant.name} ${restaurant.cuisine}`.toLowerCase().includes(search); });
  const visibleMenu = menuList.filter((item) => { const search = menuSearch.toLowerCase().trim(); return !search || `${item.name} ${item.category} ${restaurantList.find((restaurant) => restaurant.id === item.restaurantId)?.name || ""}`.toLowerCase().includes(search); });
  const visibleCustomers = customers.filter((customer) => `${customer.name} ${customer.email} ${customer.phone}`.toLowerCase().includes(customerSearch.toLowerCase().trim()));

  function updateOrderStatus(orderId, status) {
    const next = orders.map((order) => order.id === orderId ? { ...order, status } : order);
    setOrders(next); persist("crave-orders", next); setNotice(`Order ${orderId} updated to ${status}.`);
  }
  function openAddRestaurant() {
    setEditingRestaurant(null);
    setRestaurantForm({ name: "", cuisine: "", category: "Pizza", rating: "4.5", time: "20–30 min", fee: "25", offer: "10% OFF", image: "", description: "" });
    setShowRestaurantForm(true);
  }
  function openEditRestaurant(restaurant) {
    setEditingRestaurant(restaurant.id);
    setRestaurantForm({ name: restaurant.name || "", cuisine: restaurant.cuisine || "", category: restaurant.category || "Pizza", rating: String(restaurant.rating || "4.5"), time: restaurant.time || "20–30 min", fee: String(restaurant.fee ?? 25), offer: restaurant.offer || "", image: restaurant.image || "", description: restaurant.description || "" });
    setShowRestaurantForm(true);
  }
  function saveRestaurant(event) {
    event.preventDefault();
    if (!restaurantForm.name.trim() || !restaurantForm.cuisine.trim()) { setNotice("Please enter a restaurant name and cuisine."); return; }
    const restaurant = { ...restaurantForm, id: editingRestaurant || Date.now(), rating: Number(restaurantForm.rating) || 4.5, fee: Number(restaurantForm.fee) || 0, image: restaurantForm.image.trim() || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85", description: restaurantForm.description.trim() || "Freshly prepared favourites, made with care." };
    setRestaurantList((current) => editingRestaurant ? current.map((item) => item.id === editingRestaurant ? restaurant : item) : [restaurant, ...current]);
    setShowRestaurantForm(false); setNotice(editingRestaurant ? "Restaurant details updated." : "Restaurant added successfully.");
  }
  function deleteRestaurant(id) {
    const restaurant = restaurantList.find((item) => item.id === id);
    if (!window.confirm(`Delete ${restaurant?.name || "this restaurant"}?`)) return;
    setRestaurantList((current) => current.filter((item) => item.id !== id)); setNotice("Restaurant removed from the admin list.");
  }
  function openAddMenu() {
    setEditingMenu(null); setMenuForm({ restaurantId: String(restaurantList[0]?.id || "1"), name: "", description: "", price: "", category: "Pizza", emoji: "🍽️", popular: false }); setShowMenuForm(true);
  }
  function openEditMenu(item) {
    setEditingMenu(item.id); setMenuForm({ restaurantId: String(item.restaurantId), name: item.name || "", description: item.description || "", price: String(item.price || ""), category: item.category || "Other", emoji: item.emoji || "🍽️", popular: Boolean(item.popular) }); setShowMenuForm(true);
  }
  function saveMenuItem(event) {
    event.preventDefault();
    if (!menuForm.name.trim() || Number(menuForm.price) <= 0) { setNotice("Enter a menu item name and a price greater than zero."); return; }
    const item = { ...menuForm, id: editingMenu || Date.now(), restaurantId: Number(menuForm.restaurantId), price: Number(menuForm.price), popular: Boolean(menuForm.popular) };
    setMenuList((current) => editingMenu ? current.map((entry) => entry.id === editingMenu ? item : entry) : [item, ...current]);
    setShowMenuForm(false); setNotice(editingMenu ? "Menu item updated." : "Menu item added.");
  }
  function deleteMenuItem(item) {
    if (!window.confirm(`Remove ${item.name} from the menu?`)) return;
    setMenuList((current) => current.filter((entry) => entry.id !== item.id)); setNotice("Menu item removed.");
  }
  function addPromotion(event) {
    event.preventDefault();
    const code = promotionForm.code.trim().toUpperCase();
    if (!promotionForm.title.trim() || !code) { setNotice("Enter a promotion title and code."); return; }
    if (promotions.some((promotion) => promotion.code.toUpperCase() === code)) { setNotice("That promotion code already exists."); return; }
    setPromotions((current) => [{ id: code, title: promotionForm.title.trim(), code, discount: promotionForm.discount, status: "Active", uses: 0 }, ...current]);
    setPromotionForm({ title: "", code: "", discount: "10% off" }); setPromotionFormOpen(false); setNotice("Promotion created.");
  }
  function exportOrders() {
    const columns = ["Order ID", "Date", "Customer", "Address", "Payment", "Status", "Total"];
    const rows = orders.map((order) => [order.id, order.date, order.customer, order.address, order.payment, order.status, order.total]);
    const csv = [columns, ...rows].map((row) => row.map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = "crave-orders-report.csv"; anchor.click(); URL.revokeObjectURL(url);
    setNotice("Orders report exported as CSV.");
  }
  function resetDemoData() {
    if (!window.confirm("Reset admin restaurants and menu to the original demo data?")) return;
    setRestaurantList(starterRestaurants); setMenuList(starterMenu); setNotice("Restaurant and menu demo data has been reset.");
  }

  const tabs = [
    { label: "Overview", icon: LayoutDashboard }, { label: "Orders", icon: ShoppingBag },
    { label: "Restaurants", icon: Utensils }, { label: "Menu items", icon: PackageCheck },
    { label: "Customers", icon: Users }, { label: "Delivery partners", icon: Bike },
    { label: "Finance", icon: Wallet }, { label: "Promotions", icon: TicketPercent },
    { label: "Support", icon: Headset }, { label: "Reports", icon: FileBarChart },
    { label: "Settings", icon: Settings }
  ];
  const actionButton = (label, onClick, Icon = Plus) => <button onClick={onClick} className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#db5931]"><Icon size={16} />{label}</button>;

  return (
    <main className="page-wrap py-7 md:py-10">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">CRAVE CONTROL CENTRE</p><h1 className="section-title mt-1">Admin dashboard<span className="text-orange">.</span></h1><p className="mt-2 text-sm text-muted">Manage day-to-day operations from one workspace.</p></div><div className="flex flex-wrap gap-2"><Link to="/" className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-2.5 text-sm font-bold transition hover:border-orange-200 hover:text-orange">View customer site ↗</Link><button onClick={() => { logout(); navigate("/admin/login", { replace: true }); }} className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange">Log out</button></div></div>
      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-2xl border border-orange-100 bg-white p-3 shadow-soft"><p className="px-3 pb-3 pt-2 text-[10px] font-black tracking-[.15em] text-muted">WORKSPACE</p><nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">{tabs.map(({ label, icon: Icon }) => <button key={label} onClick={() => { setActiveTab(label); setNotice(""); }} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold transition ${activeTab === label ? "bg-peach text-orange" : "text-muted hover:bg-cream hover:text-ink"}`}><Icon size={17} />{label}</button>)}</nav><div className="mt-4 hidden rounded-xl bg-cream p-3 lg:block"><p className="text-xs font-extrabold text-ink">Demo admin mode</p><p className="mt-1 text-xs leading-5 text-muted">Changes are saved in this browser only.</p></div></aside>
        <section className="min-w-0">
          {notice && <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss message"><X size={16} /></button></div>}

          {activeTab === "Overview" && <><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Total orders" value={orders.length} note="All recorded demo orders" icon={ShoppingBag} /><StatCard label="Delivered revenue" value={`₹${deliveredRevenue.toLocaleString("en-IN")}`} note="Delivered orders only" icon={TrendingUp} /><StatCard label="Restaurants" value={restaurantList.length} note="In the restaurant catalogue" icon={Utensils} /><StatCard label="Customers" value={customers.length} note="Unique order customers" icon={Users} /></div><div className="mt-5"><Panel><PanelHeading title="Recent orders" description="Latest orders stored in this browser." action={<button onClick={() => setActiveTab("Orders")} className="text-sm font-bold text-orange">Manage orders →</button>} />{orders.length ? <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[580px] text-left text-sm"><thead className="text-xs uppercase tracking-wide text-muted"><tr><th className="py-3 pr-3">Order</th><th className="py-3 pr-3">Customer</th><th className="py-3 pr-3">Amount</th><th className="py-3">Status</th></tr></thead><tbody>{orders.slice(0, 5).map((order) => <tr key={order.id} className="border-t border-orange-50"><td className="py-3 pr-3 font-extrabold">{order.id}</td><td className="py-3 pr-3">{order.customer || "Guest"}</td><td className="py-3 pr-3 font-bold">₹{order.total}</td><td className="py-3"><StatusPill status={order.status} /></td></tr>)}</tbody></table></div> : <EmptyState message="No orders yet. Place a demo order from the customer site to see it here." />}</Panel></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><button onClick={() => setActiveTab("Restaurants")} className="rounded-2xl border border-orange-100 bg-white p-5 text-left shadow-soft transition hover:border-orange-200"><Utensils className="text-orange" size={20} /><p className="mt-3 font-extrabold">Restaurant catalogue</p><p className="mt-1 text-sm text-muted">Add or update restaurant listings.</p></button><button onClick={() => setActiveTab("Reports")} className="rounded-2xl border border-orange-100 bg-white p-5 text-left shadow-soft transition hover:border-orange-200"><FileBarChart className="text-orange" size={20} /><p className="mt-3 font-extrabold">Business reports</p><p className="mt-1 text-sm text-muted">Review totals and export order data.</p></button></div></>}

          {activeTab === "Orders" && <Panel><PanelHeading title="Order management" description="Search orders and update their status." /><div className="mt-4 flex items-center gap-2 rounded-xl border border-orange-100 px-3"><Search size={16} className="text-muted" /><input value={orderSearch} onChange={(event) => setOrderSearch(event.target.value)} placeholder="Search order or customer" className="w-full py-2.5 text-sm outline-none sm:w-72" /></div>{visibleOrders.length ? <div className="mt-4 space-y-3">{visibleOrders.map((order) => <article key={order.id} className="flex flex-col gap-3 rounded-xl border border-orange-100 p-4 xl:flex-row xl:items-center"><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-extrabold">{order.id}</h3><StatusPill status={order.status} /></div><p className="mt-1 text-sm text-muted">{order.customer || "Guest"} · {order.items?.map((item) => `${item.quantity}× ${item.name}`).join(", ")}</p><p className="mt-1 text-xs text-muted">{order.address || "Address not provided"} · {order.payment || "Payment not specified"}</p></div><div className="flex items-center justify-between gap-3 xl:justify-end"><span className="text-lg font-black">₹{order.total}</span><select value={order.status || "Confirmed"} onChange={(event) => updateOrderStatus(order.id, event.target.value)} className="rounded-lg border border-orange-100 bg-cream px-2 py-2 text-xs font-bold outline-none focus:border-orange">{orderStatuses.map((status) => <option key={status}>{status}</option>)}</select></div></article>)}</div> : <EmptyState message="No matching orders found." />}</Panel>}

          {activeTab === "Restaurants" && <Panel><PanelHeading title="Restaurant management" description="Add, edit, search, or remove restaurant cards." action={actionButton("Add restaurant", openAddRestaurant)} /><div className="mt-4 flex items-center gap-2 rounded-xl border border-orange-100 px-3"><Search size={16} className="text-muted" /><input value={restaurantSearch} onChange={(event) => setRestaurantSearch(event.target.value)} placeholder="Search restaurants" className="w-full py-2.5 text-sm outline-none" /></div><div className="mt-4 space-y-3">{visibleRestaurants.map((restaurant) => <article key={restaurant.id} className="flex items-center gap-3 rounded-xl border border-orange-100 p-3"><img src={restaurant.image} alt="" className="h-14 w-14 rounded-xl object-cover" /><div className="min-w-0 flex-1"><h3 className="truncate font-extrabold">{restaurant.name}</h3><p className="mt-1 truncate text-xs text-muted">{restaurant.cuisine} · {restaurant.time}</p></div><div className="hidden text-right sm:block"><p className="text-sm font-extrabold">★ {restaurant.rating}</p><p className="text-xs text-muted">{restaurant.fee ? `₹${restaurant.fee} delivery` : "Free delivery"}</p></div><button onClick={() => openEditRestaurant(restaurant)} className="rounded-lg p-2 text-muted hover:bg-peach hover:text-orange" aria-label={`Edit ${restaurant.name}`}><Pencil size={16} /></button><button onClick={() => deleteRestaurant(restaurant.id)} className="rounded-lg p-2 text-muted hover:bg-red-50 hover:text-red-500" aria-label={`Delete ${restaurant.name}`}><Trash2 size={16} /></button></article>)}</div><button onClick={resetDemoData} className="mt-4 text-xs font-bold text-muted underline decoration-dotted hover:text-orange">Reset restaurant and menu demo data</button></Panel>}

          {activeTab === "Menu items" && <Panel><PanelHeading title="Menu management" description="Create, update, search, and remove menu items." action={actionButton("Add menu item", openAddMenu)} /><div className="mt-4 flex items-center gap-2 rounded-xl border border-orange-100 px-3"><Search size={16} className="text-muted" /><input value={menuSearch} onChange={(event) => setMenuSearch(event.target.value)} placeholder="Search item, category, or restaurant" className="w-full py-2.5 text-sm outline-none" /></div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="text-xs uppercase tracking-wide text-muted"><tr><th className="py-3 pr-3">Item</th><th className="py-3 pr-3">Restaurant</th><th className="py-3 pr-3">Category</th><th className="py-3 pr-3">Price</th><th className="py-3">Actions</th></tr></thead><tbody>{visibleMenu.map((item) => <tr key={item.id} className="border-t border-orange-50"><td className="py-3 pr-3"><span className="mr-2">{item.emoji}</span><span className="font-bold">{item.name}</span>{item.popular && <span className="ml-2 rounded-full bg-peach px-2 py-1 text-[10px] font-bold text-orange">Popular</span>}</td><td className="py-3 pr-3 text-muted">{restaurantList.find((restaurant) => String(restaurant.id) === String(item.restaurantId))?.name || "Restaurant removed"}</td><td className="py-3 pr-3 text-muted">{item.category}</td><td className="py-3 pr-3 font-extrabold">₹{item.price}</td><td className="py-3"><div className="flex gap-1"><button onClick={() => openEditMenu(item)} className="rounded-lg p-2 text-muted hover:bg-peach hover:text-orange" aria-label={`Edit ${item.name}`}><Pencil size={15} /></button><button onClick={() => deleteMenuItem(item)} className="rounded-lg p-2 text-muted hover:bg-red-50 hover:text-red-500" aria-label={`Delete ${item.name}`}><Trash2 size={15} /></button></div></td></tr>)}</tbody></table></div>{!visibleMenu.length && <EmptyState message="No menu items match your search." />}</Panel>}

          {activeTab === "Customers" && <Panel><PanelHeading title="Customer directory" description="Customer details and spend are derived from recorded orders." /><div className="mt-4 flex items-center gap-2 rounded-xl border border-orange-100 px-3"><Search size={16} className="text-muted" /><input value={customerSearch} onChange={(event) => setCustomerSearch(event.target.value)} placeholder="Search name, email, or phone" className="w-full py-2.5 text-sm outline-none" /></div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="text-xs uppercase tracking-wide text-muted"><tr><th className="py-3 pr-3">Customer</th><th className="py-3 pr-3">Contact</th><th className="py-3 pr-3">Orders</th><th className="py-3">Total spend</th></tr></thead><tbody>{visibleCustomers.map((customer) => <tr key={customer.email + customer.name} className="border-t border-orange-50"><td className="py-3 pr-3 font-bold">{customer.name}</td><td className="py-3 pr-3 text-muted">{customer.email}<br />{customer.phone}</td><td className="py-3 pr-3">{customer.orders}</td><td className="py-3 font-extrabold">₹{customer.spent.toLocaleString("en-IN")}</td></tr>)}</tbody></table></div>{!visibleCustomers.length && <EmptyState message="Customers appear here when orders are recorded." />}</Panel>}

          {activeTab === "Delivery partners" && <Panel><PanelHeading title="Delivery partners" description="Manage demo delivery partner availability and service zones." /><div className="mt-4 space-y-3">{partners.map((partner) => <article key={partner.id} className="flex flex-col gap-3 rounded-xl border border-orange-100 p-4 sm:flex-row sm:items-center"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-peach text-orange"><Bike size={20} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-extrabold">{partner.name}</h3><StatusPill status={partner.status} /></div><p className="mt-1 text-xs text-muted">{partner.id} · {partner.phone} · {partner.zone}</p><p className="mt-1 text-xs text-muted">{partner.deliveries} completed demo deliveries</p></div><select value={partner.status} onChange={(event) => setPartners((current) => current.map((item) => item.id === partner.id ? { ...item, status: event.target.value } : item))} className="rounded-lg border border-orange-100 bg-cream px-3 py-2 text-xs font-bold"><option>Available</option><option>On delivery</option><option>Offline</option></select></article>)}</div><p className="mt-4 rounded-xl bg-cream p-3 text-xs leading-5 text-muted">These are sample partner records for the frontend demo. Live dispatch, GPS tracking, and partner accounts require a backend integration.</p></Panel>}

          {activeTab === "Finance" && <><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"><StatCard label="Gross order value" value={`₹${totalRevenue.toLocaleString("en-IN")}`} note="Excludes cancelled orders" icon={IndianRupee} /><StatCard label="Delivered revenue" value={`₹${deliveredRevenue.toLocaleString("en-IN")}`} note="Delivered orders only" icon={Wallet} /><StatCard label="Pending order value" value={`₹${orders.filter((order) => !["Delivered", "Cancelled"].includes(order.status)).reduce((sum, order) => sum + Number(order.total || 0), 0).toLocaleString("en-IN")}`} note="Orders not delivered or cancelled" icon={Clock3} /></div><div className="mt-5"><Panel><PanelHeading title="Order settlement summary" description="Calculated from demo order statuses; not connected to a payment provider." /><div className="mt-4 space-y-4">{[{ label: "Delivered", value: orders.filter((order) => order.status === "Delivered").length }, { label: "In progress", value: orders.filter((order) => !["Delivered", "Cancelled"].includes(order.status)).length }, { label: "Cancelled", value: orders.filter((order) => order.status === "Cancelled").length }].map((item) => <div key={item.label} className="flex items-center justify-between border-b border-orange-50 pb-3"><span className="text-sm font-semibold text-muted">{item.label}</span><span className="font-extrabold">{item.value} orders</span></div>)}</div></Panel></div></>}

          {activeTab === "Promotions" && <Panel><PanelHeading title="Promotions and coupons" description="Manage demo promotion codes." action={actionButton("Create promotion", () => setPromotionFormOpen((value) => !value))} />{promotionFormOpen && <form onSubmit={addPromotion} className="mt-4 grid gap-3 rounded-xl bg-cream p-4 sm:grid-cols-3"><label className="field-label">Promotion title<input required value={promotionForm.title} onChange={(event) => setPromotionForm({ ...promotionForm, title: event.target.value })} className="form-input" placeholder="Weekend offer" /></label><label className="field-label">Coupon code<input required value={promotionForm.code} onChange={(event) => setPromotionForm({ ...promotionForm, code: event.target.value.toUpperCase() })} className="form-input" placeholder="WEEKEND10" /></label><label className="field-label">Discount<select value={promotionForm.discount} onChange={(event) => setPromotionForm({ ...promotionForm, discount: event.target.value })} className="form-input"><option>10% off</option><option>15% off</option><option>20% off</option><option>₹50 off</option><option>₹100 off</option><option>Free delivery</option></select></label><div className="sm:col-span-3 flex justify-end"><button type="submit" className="rounded-xl bg-orange px-4 py-2.5 text-sm font-extrabold text-white">Save promotion</button></div></form>}<div className="mt-4 space-y-3">{promotions.map((promotion) => <article key={promotion.id} className="flex flex-col gap-3 rounded-xl border border-orange-100 p-4 sm:flex-row sm:items-center"><div className="grid h-11 w-11 place-items-center rounded-xl bg-peach text-orange"><TicketPercent size={20} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-extrabold">{promotion.title}</h3><StatusPill status={promotion.status} /></div><p className="mt-1 text-xs text-muted">Code <strong>{promotion.code}</strong> · {promotion.discount} · {promotion.uses} demo uses</p></div><button onClick={() => setPromotions((current) => current.map((item) => item.id === promotion.id ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" } : item))} className="rounded-lg border border-orange-100 px-3 py-2 text-xs font-bold hover:bg-cream">{promotion.status === "Active" ? "Deactivate" : "Activate"}</button><button onClick={() => { if (window.confirm(`Delete promotion ${promotion.code}?`)) setPromotions((current) => current.filter((item) => item.id !== promotion.id)); }} className="rounded-lg p-2 text-muted hover:bg-red-50 hover:text-red-500" aria-label={`Delete ${promotion.code}`}><Trash2 size={16} /></button></article>)}</div></Panel>}

          {activeTab === "Support" && <Panel><PanelHeading title="Customer support" description="Track sample support requests and update their status." /><div className="mt-4 space-y-3">{tickets.map((ticket) => <article key={ticket.id} className="flex flex-col gap-3 rounded-xl border border-orange-100 p-4 sm:flex-row sm:items-center"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-peach text-orange"><Headset size={20} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-extrabold">{ticket.subject}</h3><StatusPill status={ticket.status} /></div><p className="mt-1 text-xs text-muted">{ticket.id} · {ticket.customer} · Order {ticket.orderId} · {ticket.priority} priority</p></div><select value={ticket.status} onChange={(event) => setTickets((current) => current.map((item) => item.id === ticket.id ? { ...item, status: event.target.value } : item))} className="rounded-lg border border-orange-100 bg-cream px-3 py-2 text-xs font-bold"><option>Open</option><option>In progress</option><option>Resolved</option></select></article>)}</div><p className="mt-4 rounded-xl bg-cream p-3 text-xs leading-5 text-muted">Support tickets are sample data. This demo does not send or receive real customer messages.</p></Panel>}

          {activeTab === "Reports" && <><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"><StatCard label="Orders recorded" value={orders.length} note="All statuses" icon={ShoppingBag} /><StatCard label="Average order value" value={`₹${orders.length ? Math.round(orders.reduce((sum, order) => sum + Number(order.total || 0), 0) / orders.length).toLocaleString("en-IN") : 0}`} note="Across recorded orders" icon={TrendingUp} /><StatCard label="Active promotions" value={promotions.filter((promotion) => promotion.status === "Active").length} note="Currently enabled in demo" icon={TicketPercent} /></div><div className="mt-5"><Panel><PanelHeading title="Export reports" description="Download the order table as a CSV file for review." action={actionButton("Export orders CSV", exportOrders, Download)} /><div className="mt-4 rounded-xl bg-cream p-4 text-sm leading-6 text-muted">The export includes order ID, date, customer, address, payment method, status, and total. It contains only data currently stored in this browser.</div></Panel></div></>}

          {activeTab === "Settings" && <Panel><PanelHeading title="Store settings" description="Update the demo store details and checkout defaults." /><form onSubmit={(event) => { event.preventDefault(); persist("crave-admin-settings", settings); setNotice("Store settings saved in this browser."); }} className="mt-4 grid gap-4 sm:grid-cols-2"><label className="field-label">Store name<input value={settings.storeName} onChange={(event) => setSettings({ ...settings, storeName: event.target.value })} className="form-input" required /></label><label className="field-label">Support email<input type="email" value={settings.supportEmail} onChange={(event) => setSettings({ ...settings, supportEmail: event.target.value })} className="form-input" required /></label><label className="field-label">Support phone<input value={settings.supportPhone} onChange={(event) => setSettings({ ...settings, supportPhone: event.target.value })} className="form-input" /></label><label className="field-label">Default delivery fee (₹)<input type="number" min="0" value={settings.deliveryFee} onChange={(event) => setSettings({ ...settings, deliveryFee: event.target.value })} className="form-input" /></label><label className="field-label">Tax rate (%)<input type="number" min="0" max="100" value={settings.taxRate} onChange={(event) => setSettings({ ...settings, taxRate: event.target.value })} className="form-input" /></label><label className="field-label">Currency<select value={settings.currency} onChange={(event) => setSettings({ ...settings, currency: event.target.value })} className="form-input"><option value="INR">INR — Indian Rupee</option></select></label><label className="sm:col-span-2 flex items-center gap-3 rounded-xl bg-cream p-4 text-sm font-bold"><input type="checkbox" checked={settings.acceptingOrders} onChange={(event) => setSettings({ ...settings, acceptingOrders: event.target.checked })} className="h-4 w-4 accent-orange" />Store accepting demo orders</label><div className="sm:col-span-2 flex justify-end"><button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-orange px-5 py-3 text-sm font-extrabold text-white hover:bg-[#db5931]"><Save size={16} />Save settings</button></div></form><p className="mt-4 rounded-xl bg-cream p-3 text-xs leading-5 text-muted">Settings are stored locally for this demo. They do not change checkout fees or affect a live storefront until connected to the relevant application logic.</p></Panel>}
        </section>
      </div>

      {showRestaurantForm && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/50 p-4"><form onSubmit={saveRestaurant} className="my-6 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"><div className="flex items-start justify-between gap-3"><div><p className="eyebrow">{editingRestaurant ? "UPDATE DETAILS" : "ADD A NEW PLACE"}</p><h2 className="mt-1 text-xl font-black">{editingRestaurant ? "Edit restaurant" : "Add restaurant"}</h2></div><button type="button" onClick={() => setShowRestaurantForm(false)} className="rounded-lg p-2 text-muted hover:bg-cream" aria-label="Close form"><X size={19} /></button></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="field-label">Restaurant name *<input required value={restaurantForm.name} onChange={(event) => setRestaurantForm({ ...restaurantForm, name: event.target.value })} className="form-input" placeholder="e.g. The Curry House" /></label><label className="field-label">Cuisine *<input required value={restaurantForm.cuisine} onChange={(event) => setRestaurantForm({ ...restaurantForm, cuisine: event.target.value })} className="form-input" placeholder="Indian · North Indian" /></label><label className="field-label">Category<select value={restaurantForm.category} onChange={(event) => setRestaurantForm({ ...restaurantForm, category: event.target.value })} className="form-input">{["Pizza", "Burgers", "Asian", "Healthy", "Desserts"].map((item) => <option key={item}>{item}</option>)}</select></label><label className="field-label">Rating<input type="number" min="1" max="5" step="0.1" value={restaurantForm.rating} onChange={(event) => setRestaurantForm({ ...restaurantForm, rating: event.target.value })} className="form-input" /></label><label className="field-label">Delivery time<input value={restaurantForm.time} onChange={(event) => setRestaurantForm({ ...restaurantForm, time: event.target.value })} className="form-input" placeholder="20–30 min" /></label><label className="field-label">Delivery fee (₹)<input type="number" min="0" value={restaurantForm.fee} onChange={(event) => setRestaurantForm({ ...restaurantForm, fee: event.target.value })} className="form-input" /></label><label className="field-label">Offer label<input value={restaurantForm.offer} onChange={(event) => setRestaurantForm({ ...restaurantForm, offer: event.target.value })} className="form-input" placeholder="10% OFF" /></label><label className="field-label">Image URL<input type="url" value={restaurantForm.image} onChange={(event) => setRestaurantForm({ ...restaurantForm, image: event.target.value })} className="form-input" placeholder="https://..." /></label><label className="field-label sm:col-span-2">Short description<textarea rows="2" value={restaurantForm.description} onChange={(event) => setRestaurantForm({ ...restaurantForm, description: event.target.value })} className="form-input resize-y" placeholder="Tell customers what makes this place special." /></label></div><div className="mt-6 flex flex-col-reverse justify-end gap-2 sm:flex-row"><button type="button" onClick={() => setShowRestaurantForm(false)} className="rounded-xl border border-orange-100 px-4 py-3 text-sm font-bold text-muted hover:bg-cream">Cancel</button><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange px-5 py-3 text-sm font-extrabold text-white hover:bg-[#db5931]"><Check size={16} />Save restaurant</button></div></form></div>}

      {showMenuForm && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/50 p-4"><form onSubmit={saveMenuItem} className="my-6 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"><div className="flex items-start justify-between gap-3"><div><p className="eyebrow">MENU MANAGEMENT</p><h2 className="mt-1 text-xl font-black">{editingMenu ? "Edit menu item" : "Add menu item"}</h2></div><button type="button" onClick={() => setShowMenuForm(false)} className="rounded-lg p-2 text-muted hover:bg-cream" aria-label="Close form"><X size={19} /></button></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="field-label sm:col-span-2">Restaurant<select value={menuForm.restaurantId} onChange={(event) => setMenuForm({ ...menuForm, restaurantId: event.target.value })} className="form-input" required>{restaurantList.map((restaurant) => <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>)}</select></label><label className="field-label">Item name *<input required value={menuForm.name} onChange={(event) => setMenuForm({ ...menuForm, name: event.target.value })} className="form-input" placeholder="e.g. Paneer Tikka" /></label><label className="field-label">Price (₹) *<input required type="number" min="1" value={menuForm.price} onChange={(event) => setMenuForm({ ...menuForm, price: event.target.value })} className="form-input" /></label><label className="field-label">Category<input value={menuForm.category} onChange={(event) => setMenuForm({ ...menuForm, category: event.target.value })} className="form-input" placeholder="Pizza, Sides, Drinks" /></label><label className="field-label">Emoji<input value={menuForm.emoji} onChange={(event) => setMenuForm({ ...menuForm, emoji: event.target.value })} className="form-input" maxLength="8" /></label><label className="field-label sm:col-span-2">Description<textarea rows="2" value={menuForm.description} onChange={(event) => setMenuForm({ ...menuForm, description: event.target.value })} className="form-input resize-y" /></label><label className="sm:col-span-2 flex items-center gap-3 rounded-xl bg-cream p-4 text-sm font-bold"><input type="checkbox" checked={menuForm.popular} onChange={(event) => setMenuForm({ ...menuForm, popular: event.target.checked })} className="h-4 w-4 accent-orange" />Mark as popular</label></div><div className="mt-6 flex flex-col-reverse justify-end gap-2 sm:flex-row"><button type="button" onClick={() => setShowMenuForm(false)} className="rounded-xl border border-orange-100 px-4 py-3 text-sm font-bold text-muted hover:bg-cream">Cancel</button><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange px-5 py-3 text-sm font-extrabold text-white hover:bg-[#db5931]"><Check size={16} />Save menu item</button></div></form></div>}
    </main>
  );
}
