import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RequireAdmin from "./components/RequireAdmin";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

function Footer() {
  return (
    <footer className="mt-10 border-t border-orange-100 bg-white">
      <div className="page-wrap flex flex-col gap-3 py-7 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div className="text-lg font-black tracking-tight">crave<span className="text-orange">.</span></div>
        <p className="text-xs text-muted">Good food. Good mood. Made with care. © {new Date().getFullYear()} Crave Demo.</p>
        <p className="text-xs text-muted">Demo project · No real payments</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<OrderConfirmation />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<RequireAdmin><Admin /></RequireAdmin>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
