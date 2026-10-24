import { Link, useParams } from "react-router-dom";
import { CheckCircle2, Clock3, PackageCheck, Bike, Home as HomeIcon, ArrowRight } from "lucide-react";

const steps = [
  { title: "Order confirmed", detail: "The restaurant has received your order.", icon: CheckCircle2, done: true },
  { title: "Preparing your food", detail: "Freshly prepared, just for you.", icon: PackageCheck, done: false },
  { title: "Out for delivery", detail: "Your delivery partner is on the way.", icon: Bike, done: false },
  { title: "Delivered", detail: "Time to dig in. Enjoy your meal!", icon: HomeIcon, done: false }
];

export default function OrderConfirmation() {
  const { id } = useParams();
  const orders = JSON.parse(localStorage.getItem("crave-orders") || "[]");
  const order = orders.find((item) => item.id === id);

  if (!order) return <main className="page-wrap py-20 text-center"><h1 className="text-2xl font-black">We couldn't find that order</h1><Link to="/orders" className="mt-4 inline-block font-bold text-orange">View order history</Link></main>;

  return (
    <main className="page-wrap max-w-4xl py-8 md:py-12">
      <div className="rounded-[28px] border border-orange-100 bg-white p-6 text-center shadow-soft sm:p-10">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-green-50 text-green"><CheckCircle2 size={34} /></div>
        <p className="eyebrow mt-5">THAT'S A GREAT CHOICE</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">Order confirmed!</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">Thanks, {order.customer}. We're getting your delicious order ready.</p>
        <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-peach px-4 py-2 text-sm font-extrabold text-ink">Order ID: {order.id}</div>
        <div className="mx-auto mt-8 max-w-xl rounded-2xl bg-cream p-5 text-left">
          <div className="flex items-center justify-between border-b border-orange-100 pb-3"><span className="text-sm text-muted">Estimated arrival</span><span className="flex items-center gap-1 text-sm font-extrabold"><Clock3 size={15} className="text-orange" /> 25–35 min</span></div>
          <div className="mt-5 space-y-5">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return <div key={step.title} className="flex gap-3"><div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${step.done ? "bg-green text-white" : "bg-white text-muted"}`}><Icon size={17} /></div><div className="flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className={`text-sm font-extrabold ${step.done ? "text-ink" : "text-muted"}`}>{step.title}</h3>{step.done && <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green">DONE</span>}</div><p className="mt-1 text-xs text-muted">{step.detail}</p></div>{index < steps.length - 1 && <span className="sr-only">Next step</span>}</div>;
            })}
          </div>
        </div>
        <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-orange-100 p-4 text-left">
          <h2 className="font-extrabold">Order summary</h2>
          <div className="mt-3 space-y-2">{order.items.map((item) => <div key={item.cartId} className="flex justify-between gap-3 text-sm"><span className="text-muted">{item.quantity} × {item.name}</span><span className="font-bold">₹{item.price * item.quantity}</span></div>)}</div>
          <div className="mt-4 flex justify-between border-t border-orange-50 pt-3"><span className="font-bold">Total paid / due</span><span className="text-lg font-black">₹{order.total}</span></div>
          <p className="mt-2 text-xs text-muted">{order.payment} · {order.address}</p>
        </div>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link to="/" className="rounded-full bg-orange px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#db5931]">Back to home</Link><Link to="/orders" className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-100 px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-cream">Order history <ArrowRight size={16} /></Link></div>
      </div>
    </main>
  );
}
