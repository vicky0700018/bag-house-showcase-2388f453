import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products as seedProducts, type Product } from "@/data/products";
import {
  banners as seedBanners,
  categories as seedCategories,
  coupons as seedCoupons,
  business,
  type Banner,
  type Category,
  type Coupon,
} from "@/data/site";
import {
  seedOrders,
  seedCustomers,
  seedEnquiries,
  seedBulkEnquiries,
  adminCredentials,
  type AdminOrder,
  type BulkEnquiry,
  type Enquiry,
  type OrderStatus,
  type EnquiryStatus,
} from "@/data/admin";

export type CartItem = {
  key: string;
  id: string;
  name: string;
  image: string;
  price: number;
  color: string;
  size: string;
  qty: number;
};

export type PlacedOrder = {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  address: string;
  name: string;
  payment: string;
  delivery: string;
  eta: string;
};

export type Toast = { id: number; message: string; tone: "success" | "error" | "info" };

type Settings = {
  name: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  instagram: string;
  facebook: string;
  hours: string;
};

type Ctx = {
  ready: boolean;
  cart: CartItem[];
  addToCart: (p: Product, opts?: { color?: string; size?: string; qty?: number }) => void;
  setQty: (key: string, qty: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  coupon: Coupon | null;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  discount: number;
  toasts: Toast[];
  toast: (message: string, tone?: Toast["tone"]) => void;
  dismissToast: (id: number) => void;
  lastOrder: PlacedOrder | null;
  placeOrder: (o: Omit<PlacedOrder, "id" | "date" | "eta">) => PlacedOrder;
  // admin
  isAdmin: boolean;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
  adminProducts: Product[];
  setAdminProducts: (p: Product[]) => void;
  adminCategories: Category[];
  setAdminCategories: (c: Category[]) => void;
  adminOrders: AdminOrder[];
  setAdminOrders: (o: AdminOrder[]) => void;
  adminEnquiries: Enquiry[];
  setAdminEnquiries: (e: Enquiry[]) => void;
  adminBulk: BulkEnquiry[];
  setAdminBulk: (b: BulkEnquiry[]) => void;
  adminBanners: Banner[];
  setAdminBanners: (b: Banner[]) => void;
  adminCoupons: Coupon[];
  setAdminCoupons: (c: Coupon[]) => void;
  settings: Settings;
  setSettings: (s: Settings) => void;
  customers: typeof seedCustomers;
  submitEnquiry: (e: Omit<Enquiry, "id" | "date" | "status">) => void;
  submitBulk: (b: Omit<BulkEnquiry, "id" | "status">) => void;
};

const StoreContext = createContext<Ctx | null>(null);

const LS = "cbh_state_v1";

const defaultSettings: Settings = {
  name: business.name,
  phone: business.phone,
  email: business.email,
  address: business.address,
  description: business.description,
  instagram: business.social.instagram,
  facebook: business.social.facebook,
  hours: "Mon–Sat 10:00 AM – 9:00 PM | Sun 11:00 AM – 7:00 PM",
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [lastOrder, setLastOrder] = useState<PlacedOrder | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminProducts, setAdminProducts] = useState<Product[]>(seedProducts);
  const [adminCategories, setAdminCategories] = useState<Category[]>(seedCategories);
  const [adminOrders, setAdminOrders] = useState<AdminOrder[]>(seedOrders);
  const [adminEnquiries, setAdminEnquiries] = useState<Enquiry[]>(seedEnquiries);
  const [adminBulk, setAdminBulk] = useState<BulkEnquiry[]>(seedBulkEnquiries);
  const [adminBanners, setAdminBanners] = useState<Banner[]>(seedBanners);
  const [adminCoupons, setAdminCoupons] = useState<Coupon[]>(seedCoupons);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.cart) setCart(s.cart);
        if (s.wishlist) setWishlist(s.wishlist);
        if (s.coupon) setCoupon(s.coupon);
        if (s.lastOrder) setLastOrder(s.lastOrder);
        if (s.isAdmin) setIsAdmin(s.isAdmin);
        if (s.adminOrders) setAdminOrders(s.adminOrders);
        if (s.adminEnquiries) setAdminEnquiries(s.adminEnquiries);
        if (s.adminBulk) setAdminBulk(s.adminBulk);
        if (s.adminCoupons) setAdminCoupons(s.adminCoupons);
        if (s.adminCategories) setAdminCategories(s.adminCategories);
        if (s.settings) setSettings(s.settings);
        if (s.adminProducts) setAdminProducts(s.adminProducts);
        if (s.adminBanners) setAdminBanners(s.adminBanners);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(
        LS,
        JSON.stringify({
          cart,
          wishlist,
          coupon,
          lastOrder,
          isAdmin,
          adminOrders,
          adminEnquiries,
          adminBulk,
          adminCoupons,
          adminCategories,
          adminProducts,
          adminBanners,
          settings,
        }),
      );
    } catch {
      /* ignore */
    }
  }, [ready, cart, wishlist, coupon, lastOrder, isAdmin, adminOrders, adminEnquiries, adminBulk, adminCoupons, adminCategories, adminProducts, adminBanners, settings]);

  const toast = (message: string, tone: Toast["tone"] = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = coupon && subtotal >= coupon.minOrder ? Math.round((subtotal * coupon.percent) / 100) : 0;

  const value: Ctx = {
    ready,
    cart,
    cartCount: cart.reduce((s, i) => s + i.qty, 0),
    subtotal,
    addToCart: (p, opts) => {
      const color = opts?.color ?? p.colors[0] ?? "Default";
      const size = opts?.size ?? p.sizes?.[0] ?? "Standard";
      const qty = opts?.qty ?? 1;
      const key = `${p.id}-${color}-${size}`;
      setCart((c) => {
        const found = c.find((i) => i.key === key);
        if (found) return c.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
        return [...c, { key, id: p.id, name: p.name, image: p.image, price: p.price, color, size, qty }];
      });
      toast(`${p.name} added to cart`);
    },
    setQty: (key, qty) =>
      setCart((c) => c.map((i) => (i.key === key ? { ...i, qty: Math.max(1, Math.min(99, qty)) } : i))),
    removeFromCart: (key) => {
      setCart((c) => c.filter((i) => i.key !== key));
      toast("Removed from cart", "info");
    },
    clearCart: () => setCart([]),
    wishlist,
    toggleWishlist: (id) => {
      setWishlist((w) => {
        const has = w.includes(id);
        toast(has ? "Removed from wishlist" : "Saved to wishlist", has ? "info" : "success");
        return has ? w.filter((x) => x !== id) : [...w, id];
      });
    },
    coupon,
    applyCoupon: (code) => {
      const found = adminCoupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase() && c.active);
      if (!found) return toast("Invalid or inactive coupon code", "error");
      if (subtotal < found.minOrder)
        return toast(`Minimum order ₹${found.minOrder.toLocaleString("en-IN")} required for ${found.code}`, "error");
      setCoupon(found);
      toast(`${found.code} applied — ${found.percent}% off`);
    },
    removeCoupon: () => {
      setCoupon(null);
      toast("Coupon removed", "info");
    },
    discount,
    toasts,
    toast,
    dismissToast: (id) => setToasts((t) => t.filter((x) => x.id !== id)),
    lastOrder,
    placeOrder: (o) => {
      const id = "CBH-" + Math.floor(100000 + Math.random() * 899999);
      const eta = new Date(Date.now() + (o.delivery === "Express Delivery" ? 2 : 5) * 86400000).toLocaleDateString(
        "en-IN",
        { day: "numeric", month: "long", year: "numeric" },
      );
      const order: PlacedOrder = { ...o, id, date: new Date().toISOString().slice(0, 10), eta };
      setLastOrder(order);
      setAdminOrders((prev) => [
        {
          id,
          customer: o.name,
          date: order.date,
          items: o.items.map((i) => `${i.name} ×${i.qty}`).join(", "),
          amount: o.total,
          payment: o.payment,
          status: "Pending" as OrderStatus,
        },
        ...prev,
      ]);
      setCart([]);
      setCoupon(null);
      return order;
    },
    isAdmin,
    adminLogin: (email, password) => {
      const ok = email.trim().toLowerCase() === adminCredentials.email && password === adminCredentials.password;
      setIsAdmin(ok);
      toast(ok ? "Welcome back, admin" : "Invalid admin credentials", ok ? "success" : "error");
      return ok;
    },
    adminLogout: () => {
      setIsAdmin(false);
      toast("Signed out of admin", "info");
    },
    adminProducts,
    setAdminProducts,
    adminCategories,
    setAdminCategories,
    adminOrders,
    setAdminOrders,
    adminEnquiries,
    setAdminEnquiries,
    adminBulk,
    setAdminBulk,
    adminBanners,
    setAdminBanners,
    adminCoupons,
    setAdminCoupons,
    settings,
    setSettings,
    customers: seedCustomers,
    submitEnquiry: (e) => {
      setAdminEnquiries((prev) => [
        { ...e, id: "EN-" + Math.floor(1000 + Math.random() * 8999), date: new Date().toISOString().slice(0, 10), status: "New" as EnquiryStatus },
        ...prev,
      ]);
    },
    submitBulk: (b) => {
      setAdminBulk((prev) => [{ ...b, id: "BQ-" + Math.floor(100 + Math.random() * 899), status: "New" as EnquiryStatus }, ...prev]);
    },
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function useActiveProducts() {
  const { adminProducts } = useStore();
  return useMemo(() => adminProducts.filter((p) => p.active), [adminProducts]);
}
