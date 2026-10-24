import { Link } from "react-router-dom";
import { ArrowRight, Clock3, Package } from "lucide-react";

export default function Orders() {
  const orders = JSON.parse(localStorage.getItem("crave-orders") || "[]");

  return (
    <main className="page-wrap min-h-[70vh] py-8 md:py-10">
      <div className="mb-7"><p className="eyebrow">YOUR FOOD JOURNEY</p><h1 className="section-title mt-1">Order history<span className="text-orange">.</span></h1><p className="mt-2 text-sm text-muted">All your delicious decisions in one place.</p></div>
      {!orders.length ? (
        <div className="rounded-[28px] border border-orange-100 bg-white px-6 py-14 text-center shadow-soft"><div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-peach text-orange"><Package size={28} /></div><h2 className="mt-5 text-xl font-extrabold">No orders yet</h2><p className="mt-2 text-sm text-muted">Your next favourite meal is waiting.</p><Link to="/" className="mt-6 inline-flex rounded-full bg-orange px-5 py-3 text-sm font-extrabold text-white">Browse restaurants</Link></div>
      ) : (
        <div className="space-y-4">{orders.map((order) => <article key={order.id} className="flex flex-col gap-4 rounded-2xl border border-orange-100 bg-white p-5 shadow-soft sm:flex-row sm:items-center"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-peach text-orange"><Package size={22} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="font-extrabold">{order.id}</h2><span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green">{order.status}</span></div><p className="mt-1 text-sm text-muted">{order.items.map((item) => `${item.quantity} × ${item.name}`).join(", ")}</p><p className="mt-2 flex items-center gap-1 text-xs text-muted"><Clock3 size={13} /> {order.date}</p></div><div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end"><span className="text-lg font-black">₹{order.total}</span><Link to={`/order/${order.id}`} className="inline-flex items-center gap-1 text-sm font-bold text-orange">View details <ArrowRight size={15} /></Link></div></article>)}</div>
      )}
    </main>
  );
}
