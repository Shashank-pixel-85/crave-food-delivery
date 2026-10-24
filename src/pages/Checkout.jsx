import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, MapPin, CreditCard } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "Bengaluru", payment: "Cash on delivery" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const couponApplied = Boolean(location.state?.couponApplied);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 29;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal - discount + delivery + tax;

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function validate() {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!/^[6-9]\d{9}$/.test(form.phone)) nextErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!form.address.trim()) nextErrors.address = "Please enter your delivery address.";
    if (!form.city.trim()) nextErrors.city = "Please enter your city.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function placeOrder(event) {
    event.preventDefault();
    if (!cart.length) {
      navigate("/");
      return;
    }
    if (!validate()) return;
    setSubmitting(true);
    const order = {
      id: `CR${Date.now().toString().slice(-7)}`,
      date: new Date().toLocaleString("en-IN"),
      items: cart,
      total,
      status: "Confirmed",
      customer: form.name,
      phone: form.phone,
      address: `${form.address}, ${form.city}`,
      payment: form.payment
    };
    const oldOrders = JSON.parse(localStorage.getItem("crave-orders") || "[]");
    localStorage.setItem("crave-orders", JSON.stringify([order, ...oldOrders]));
    clearCart();
    navigate(`/order/${order.id}`);
  }

  if (!cart.length) return <main className="page-wrap py-20 text-center"><h1 className="text-2xl font-black">Your cart is empty</h1><Link to="/" className="mt-4 inline-block font-bold text-orange">Find something tasty</Link></main>;

  return (
    <main className="page-wrap py-8 md:py-10">
      <Link to="/cart" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-muted transition hover:text-orange"><ArrowLeft size={17} /> Back to cart</Link>
      <div className="mb-7"><p className="eyebrow">ONE LAST STEP</p><h1 className="section-title mt-1">Checkout<span className="text-orange">.</span></h1><p className="mt-2 text-sm text-muted">Where should we bring the good stuff?</p></div>
      <form onSubmit={placeOrder} className="grid items-start gap-6 lg:grid-cols-[1fr_350px]">
        <section className="space-y-5 rounded-2xl border border-orange-100 bg-white p-5 shadow-soft sm:p-7">
          <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-peach text-orange"><MapPin size={19} /></div><div><h2 className="font-extrabold">Delivery details</h2><p className="text-xs text-muted">Add a few details so we can find you.</p></div></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="field-label">Full name<input name="name" value={form.name} onChange={updateField} placeholder="Your name" className="form-input" />{errors.name && <span className="field-error">{errors.name}</span>}</label>
            <label className="field-label">Mobile number<input name="phone" value={form.phone} onChange={updateField} placeholder="10-digit mobile number" inputMode="numeric" maxLength={10} className="form-input" />{errors.phone && <span className="field-error">{errors.phone}</span>}</label>
            <label className="field-label sm:col-span-2">Delivery address<textarea name="address" value={form.address} onChange={updateField} placeholder="House / flat, street, area" rows="3" className="form-input resize-y" />{errors.address && <span className="field-error">{errors.address}</span>}</label>
            <label className="field-label sm:col-span-2">City<input name="city" value={form.city} onChange={updateField} placeholder="City" className="form-input" />{errors.city && <span className="field-error">{errors.city}</span>}</label>
          </div>
          <div className="border-t border-orange-50 pt-5">
            <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-peach text-orange"><CreditCard size={19} /></div><div><h2 className="font-extrabold">Payment method</h2><p className="text-xs text-muted">Choose how you'd like to pay.</p></div></div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {["Cash on delivery", "UPI (demo)"].map((payment) => <label key={payment} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm font-bold transition ${form.payment === payment ? "border-orange bg-peach" : "border-orange-100"}`}><input type="radio" name="payment" value={payment} checked={form.payment === payment} onChange={updateField} className="accent-orange" />{payment}</label>)}
            </div>
            {form.payment === "UPI (demo)" && <p className="mt-2 text-xs text-muted">Demo option only — no real payment will be processed.</p>}
          </div>
        </section>
        <aside className="rounded-2xl border border-orange-100 bg-white p-5 shadow-soft lg:sticky lg:top-24">
          <h2 className="text-lg font-extrabold">Your order</h2>
          <div className="mt-4 space-y-3">{cart.map((item) => <div key={item.cartId} className="flex justify-between gap-3 text-sm"><span className="text-muted">{item.quantity} × {item.name}</span><span className="font-bold">₹{item.price * item.quantity}</span></div>)}</div>
          <div className="my-4 space-y-2 border-t border-dashed border-orange-100 pt-4 text-sm">
            <div className="flex justify-between text-muted"><span>Subtotal</span><span>₹{subtotal}</span></div><div className="flex justify-between text-muted"><span>Delivery</span><span>{delivery ? `₹${delivery}` : "FREE"}</span></div><div className="flex justify-between text-muted"><span>Taxes</span><span>₹{tax}</span></div>{discount > 0 && <div className="flex justify-between text-green"><span>Discount</span><span>-₹{discount}</span></div>}
          </div>
          <div className="flex justify-between border-t border-orange-50 pt-4"><span className="font-bold">Total</span><span className="text-2xl font-black">₹{total}</span></div>
          <button type="submit" disabled={submitting} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange px-4 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#db5931] disabled:opacity-60"><CheckCircle2 size={17} /> Place order</button>
          <p className="mt-3 text-center text-xs text-muted">Demo checkout — no payment is charged.</p>
        </aside>
      </form>
    </main>
  );
}
