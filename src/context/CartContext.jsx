import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("crave-cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("crave-cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item, options = {}) {
    const cartId = `${item.id}-${options.size || "regular"}-${options.note || ""}`;
    setCart((current) => {
      const existing = current.find((cartItem) => cartItem.cartId === cartId);
      if (existing) {
        return current.map((cartItem) =>
          cartItem.cartId === cartId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...current, { ...item, ...options, cartId, quantity: 1 }];
    });
  }

  function updateQuantity(cartId, change) {
    setCart((current) =>
      current
        .map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(cartId) {
    setCart((current) => current.filter((item) => item.cartId !== cartId));
  }

  function clearCart() {
    setCart([]);
  }

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
