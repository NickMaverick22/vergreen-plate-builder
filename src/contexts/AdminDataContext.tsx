import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

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


export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<Inventory>({});

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) {
        setOrders(
          data.map((o) => ({
            ...o,
            createdAt: new Date(o.created_at),
          })) as Order[]
        );
      }

      const { data: inv } = await supabase.from("inventory").select("*");
      if (inv) {
        const grouped: Inventory = {};
        for (const item of inv) {
          const cat = item.category as string;
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push({
            id: item.id,
            name: item.name,
            stock: item.stock,
            minStock: item.min_stock,
            icon: item.icon,
          });
        }
        setInventory(grouped);
      }
    };

    load();

    const channel = supabase
      .channel("orders")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          const order = payload.new as unknown as Order & { created_at: string };
          setOrders((prev) => [
            { ...order, createdAt: new Date(order.created_at) },
            ...prev,
          ]);
          toast({ title: "New order", description: `${order.id} placed` });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        (payload) => {
          const order = payload.new as unknown as Order;
          setOrders((prev) => prev.map((o) => (o.id === order.id ? order : o)));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const adjustInventory = (category: string, itemId: string, change: number) => {
    setInventory((prev) => {
      const next = {
        ...prev,
        [category]: prev[category].map((item) =>
          item.id === itemId ? { ...item, stock: Math.max(0, item.stock + change) } : item
        ),
      };
      const item = next[category].find((i) => i.id === itemId);
      if (item) {
        void supabase.from("inventory").update({ stock: item.stock }).eq("id", itemId);
      }
      return next;
    });
  };

  const restockItem = (category: string, itemId: string) => {
    setInventory((prev) => {
      const next = {
        ...prev,
        [category]: prev[category].map((item) =>
          item.id === itemId ? { ...item, stock: item.minStock * 2 } : item
        ),
      };
      const item = next[category].find((i) => i.id === itemId);
      if (item) {
        void supabase.from("inventory").update({ stock: item.stock }).eq("id", itemId);
      }
      return next;
    });
    toast({ title: "Item restocked" });
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    void supabase.from("orders").update({ status }).eq("id", id);
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
                void supabase.from("inventory").update({ stock: items[idx].stock }).eq("id", ing);
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

