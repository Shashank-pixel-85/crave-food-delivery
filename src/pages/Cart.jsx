import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2, TicketPercent, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  const navigate = useNavigate();
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 29;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal - discount + delivery + tax;

  function applyCoupon() {
    if (coupon.trim().toUpperCase() === "CRAVE10") {
      setCouponApplied(true);
      setCouponMessage("Nice! 10% discount applied.");
    } else {
      setCouponApplied(false);
      setCouponMessage("Try code CRAVE10 for 10% off.");
    }
  }

  return (
    <main className="page-wrap min-h-[70vh] py-8 md:py-10">
      <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-muted transition hover:text-orange"><ArrowLeft size={17} /> Continue shopping</Link>
      <div className="mb-7"><p className="eyebrow">ALMOST THERE</p><h1 className="section-title mt-1">Your cart<span className="text-orange">.</span></h1><p className="mt-2 text-sm text-muted">A good meal is only a few steps away.</p></div>

      {cart.length === 0 ? (
        <div className="rounded-[28px] border border-orange-100 bg-white px-6 py-14 text-center shadow-soft">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-peach text-orange"><ShoppingBag size={29} /></div>
          <h2 className="mt-5 text-xl font-extrabold">Your cart is looking hungry</h2>
          <p className="mt-2 text-sm text-muted">Explore the menu and add something delicious.</p>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-orange px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#db5931]">Explore restaurants</Link>
        </div>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
          <section className="space-y-3">
            {cart.map((item) => (
              <article key={item.cartId} className="flex gap-4 rounded-2xl border border-orange-100 bg-white p-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-peach text-3xl">{item.emoji || "🍽️"}</div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-extrabold text-ink">{item.name}</h3>
                  <p className="mt-1 text-xs text-muted">{item.restaurantName || "Crave kitchen"}</p>
                  <p className="mt-2 font-extrabold text-ink">₹{item.price * item.quantity}</p>
                </div>
                <div className="flex flex-col items-end justify-between gap-3">
                  <button onClick={() => removeFromCart(item.cartId)} className="rounded-lg p-1.5 text-muted transition hover:bg-red-50 hover:text-red-500" aria-label={`Remove ${item.name}`}><Trash2 size={17} /></button>
                  <div className="flex items-center gap-3 rounded-xl border border-orange-100 px-2 py-1.5">
                    <button onClick={() => updateQuantity(item.cartId, -1)} aria-label="Decrease quantity"><Minus size={14} /></button><span className="min-w-3 text-center text-sm font-bold">{item.quantity}</span><button onClick={() => updateQuantity(item.cartId, 1)} aria-label="Increase quantity"><Plus size={14} /></button>
                  </div>
                </div>
              </article>
            ))}
          </section>
          <aside className="rounded-2xl border border-orange-100 bg-white p-5 shadow-soft lg:sticky lg:top-24">
            <h2 className="text-lg font-extrabold">Order summary</h2>
            <div className="mt-5 flex gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-orange-100 px-3"><TicketPercent size={17} className="text-orange" /><input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Coupon code" className="w-full py-3 text-sm uppercase outline-none" /></div>
              <button onClick={applyCoupon} className="rounded-xl bg-ink px-4 text-sm font-bold text-white transition hover:bg-orange">Apply</button>
            </div>
            {couponMessage && <p className={`mt-2 text-xs font-semibold ${couponApplied ? "text-green" : "text-orange"}`}>{couponMessage}</p>}
            <div className="my-5 space-y-3 border-y border-dashed border-orange-100 py-5 text-sm">
              <div className="flex justify-between text-muted"><span>Subtotal</span><span className="font-semibold text-ink">₹{subtotal}</span></div>
              <div className="flex justify-between text-muted"><span>Delivery fee</span><span className="font-semibold text-ink">{delivery ? `₹${delivery}` : "FREE"}</span></div>
              <div className="flex justify-between text-muted"><span>Taxes (5%)</span><span className="font-semibold text-ink">₹{tax}</span></div>
              {discount > 0 && <div className="flex justify-between text-green"><span>Coupon discount</span><span>-₹{discount}</span></div>}
              {subtotal > 0 && subtotal < 499 && <p className="rounded-lg bg-peach p-2 text-xs text-muted">Add ₹{499 - subtotal} more for free delivery.</p>}
            </div>
            <div className="flex items-center justify-between"><span className="font-bold">Total</span><span className="text-2xl font-black text-ink">₹{total}</span></div>
            <button onClick={() => navigate("/checkout", { state: { couponApplied } })} className="mt-5 w-full rounded-xl bg-orange px-4 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#db5931]">Proceed to checkout</button>
            <p className="mt-3 text-center text-xs text-muted">Secure checkout · Freshly prepared</p>
          </aside>
        </div>
      )}
    </main>
  );
}
