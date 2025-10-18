import React, { createContext, useContext, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number; // in cents
  image: string;
  qty: number;
  size?: string;
  color?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  subtotal: number;
  clear: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem: CartContextType["addItem"] = (item) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + (item.qty ?? 1) } : p));
      }
      return [...prev, { ...item, qty: item.qty ?? 1 }];
    });
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));
  const updateQty = (id: string, qty: number) => setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  const clear = () => setItems([]);

  const subtotal = useMemo(() => items.reduce((acc, i) => acc + i.price * i.qty, 0), [items]);

  const value = { items, addItem, removeItem, updateQty, subtotal, clear };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
