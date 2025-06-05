import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

export type OrderStatus = "Submitted" | "Validated" | "Preparing" | "Ready";

export interface Order {
  id: string;
  customer: string;
  ingredients: string[];
  status: OrderStatus;
  createdAt: Date;
  total: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  minStock: number;
  icon: string;
}

export type Inventory = Record<string, InventoryItem[]>;

interface AdminContextValue {
  orders: Order[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  inventory: Inventory;
  adjustInventory: (category: string, itemId: string, change: number) => void;
  restockItem: (category: string, itemId: string) => void;
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

export const useAdminData = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdminData must be within AdminProvider");
  return ctx;
};

const customers = ["Alex", "Sarah", "Mike", "Emma", "Tom"];

const initialInventory: Inventory = {
  base: [
    { id: "rice", name: "Rice", stock: 20, minStock: 10, icon: "🍚" },
    { id: "quinoa", name: "Quinoa", stock: 15, minStock: 10, icon: "🌾" },
    { id: "pasta", name: "Pasta", stock: 18, minStock: 8, icon: "🍝" },
  ],
  proteins: [
    { id: "chicken", name: "Chicken", stock: 12, minStock: 10, icon: "🍗" },
    { id: "tuna", name: "Tuna", stock: 9, minStock: 8, icon: "🐟" },
    { id: "shrimp", name: "Shrimp", stock: 6, minStock: 6, icon: "🦐" },
  ],
  veggies: [
    { id: "spinach", name: "Spinach", stock: 22, minStock: 15, icon: "🥬" },
    { id: "carrots", name: "Carrots", stock: 16, minStock: 12, icon: "🥕" },
    { id: "tomatoes", name: "Tomatoes", stock: 5, minStock: 10, icon: "🍅" },
  ],
  cheese: [
    { id: "mozz", name: "Mozzarella", stock: 8, minStock: 6, icon: "🧀" },
    { id: "sicilian", name: "Sicilian", stock: 4, minStock: 6, icon: "🧀" },
  ],
  sauces: [
    { id: "pesto", name: "Pesto", stock: 10, minStock: 8, icon: "🫙" },
    { id: "tomato", name: "Tomato", stock: 14, minStock: 10, icon: "🍅" },
    { id: "caesar", name: "Caesar", stock: 6, minStock: 6, icon: "🥣" },
  ],
};

const allIngredientIds = Object.values(initialInventory).flat().map((i) => i.id);

const randomIngredients = () => {
  const count = Math.floor(Math.random() * 4) + 2;
  const shuffled = [...allIngredientIds].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const initialOrders: Order[] = [
  {
    id: "VG-001",
    customer: "Alex",
    ingredients: randomIngredients(),
    status: "Preparing",
    createdAt: new Date(),
    total: 12.5,
  },
  {
    id: "VG-002",
    customer: "Sarah",
    ingredients: randomIngredients(),
    status: "Ready",
    createdAt: new Date(),
    total: 11.25,
  },
];

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [inventory, setInventory] = useState<Inventory>(initialInventory);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = `VG-${Date.now().toString().slice(-4)}`;
      const newOrder: Order = {
        id,
        customer: customers[Math.floor(Math.random() * customers.length)],
        ingredients: randomIngredients(),
        status: "Submitted",
        createdAt: new Date(),
        total: parseFloat((Math.random() * 8 + 8).toFixed(2)),
      };
      setOrders((prev) => [newOrder, ...prev]);
      toast({ title: "New order", description: `${newOrder.id} placed` });
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const adjustInventory = (category: string, itemId: string, change: number) => {
    setInventory((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === itemId ? { ...item, stock: Math.max(0, item.stock + change) } : item
      ),
    }));
  };

  const restockItem = (category: string, itemId: string) => {
    setInventory((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === itemId ? { ...item, stock: item.minStock * 2 } : item
      ),
    }));
    toast({ title: "Item restocked" });
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    toast({ title: "Order updated", description: `${id} → ${status}` });
    if (status === "Preparing") {
      const order = orders.find((o) => o.id === id);
      if (order) {
        setInventory((prev) => {
          const next = { ...prev };
          order.ingredients.forEach((ing) => {
            for (const [cat, items] of Object.entries(next)) {
              const idx = items.findIndex((i) => i.id === ing);
              if (idx !== -1) {
                items[idx] = { ...items[idx], stock: Math.max(0, items[idx].stock - 1) };
                break;
              }
            }
          });
          return next;
        });
      }
    }
  };

  const value = {
    orders,
    updateOrderStatus,
    inventory,
    adjustInventory,
    restockItem,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

