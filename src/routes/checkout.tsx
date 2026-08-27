import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { inr } from "@/lib/format";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Chandok Bag House" },
      { name: "description", content: "Complete your demo order with delivery details and a payment method at Chandok Bag House." },
      { property: "og:title", content: "Checkout — Chandok Bag House" },
      { property: "og:description", content: "Enter delivery details and choose a payment method for your order." },
    ],
  }),
  component: CheckoutPage,
});

const payments = ["Cash on Delivery", "UPI", "Card", "Net Banking"];

function CheckoutPage() {
  const { cart, subtotal, discount, coupon, placeOrder, toast } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
  });
  const [delivery, setDelivery] = useState("Standard Delivery");
  const [payment, setPayment] = useState(payments[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const shipping = delivery === "Express Delivery" ? 199 : subtotal - discount >= 2000 ? 0 : 99;
  const total = Math.max(0, subtotal - discount) + shipping;

  if (cart.length === 0)
    return (
      <main className="container-page py-20">
        <div className="surface mx-auto max-w-md p-10 text-center">
          <p className="font-display text-2xl text-primary">Nothing to check out</p>
          <p className="mt-2 text-sm text-muted-foreground">Your cart is empty.</p>
          <Link to="/shop" className="btn-base btn-primary mt-6">Browse products</Link>
        </div>
      </main>
    );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (form.name.trim().length < 2) err.name = "Enter your full name";
    if (!/^[0-9+\s-]{10,15}$/.test(form.phone.trim())) err.phone = "Enter a valid mobile number";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) err.email = "Enter a valid email";
    if (form.address.trim().length < 8) err.address = "Enter your full address";
    if (form.city.trim().length < 2) err.city = "Enter your city";
    if (!/^[0-9]{6}$/.test(form.pincode.trim())) err.pincode = "Enter a 6-digit pincode";
    setErrors(err);
    if (Object.keys(err).length) return toast("Please correct the highlighted fields", "error");

    setBusy(true);
    setTimeout(() => {
      placeOrder({
        items: cart,
        total,
        name: form.name,
        address: `${form.address}, ${form.city}, ${form.state} ${form.pincode}`,
        payment,
        delivery,
      });
      setBusy(false);
      navigate({ to: "/order-success" });
    }, 700);
  };

  return (
    <main className="container-page py-10">
      <h1 className="font-display text-4xl text-primary">Checkout</h1>
      <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]" noValidate>
        <div className="space-y-6">
          <section className="surface p-6">
            <h2 className="font-display text-xl text-primary">Customer Details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                { k: "name", l: "Full Name", p: "Navneet Singh" },
                { k: "phone", l: "Mobile Number", p: "+91 90000 00000" },
                { k: "email", l: "Email", p: "you@example.com" },
                { k: "city", l: "City", p: "Pimpri-Chinchwad" },
                { k: "state", l: "State", p: "Maharashtra" },
                { k: "pincode", l: "Pincode", p: "411027" },
              ].map((f) => (
                <div key={f.k}>
                  <label className="label-x" htmlFor={`co-${f.k}`}>{f.l}</label>
                  <input
                    id={`co-${f.k}`}
                    className="field"
                    placeholder={f.p}
                    value={form[f.k as keyof typeof form]}
                    onChange={(e) => set(f.k, e.target.value)}
                  />
                  {errors[f.k] && <p className="mt-1 text-xs text-destructive">{errors[f.k]}</p>}
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="label-x" htmlFor="co-address">Address</label>
                <textarea id="co-address" rows={3} className="field" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="House / flat, street, landmark" />
                {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
              </div>
            </div>
          </section>

          <section className="surface p-6">
            <h2 className="font-display text-xl text-primary">Delivery Method</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { id: "Standard Delivery", d: "3–5 working days", c: subtotal - discount >= 2000 ? "Free" : "₹99" },
                { id: "Express Delivery", d: "1–2 working days", c: "₹199" },
              ].map((d) => (
                <label key={d.id} className={`cursor-pointer rounded-lg border p-4 text-sm ${delivery === d.id ? "border-secondary bg-accent/10" : "border-border"}`}>
                  <input type="radio" name="delivery" className="mr-2" checked={delivery === d.id} onChange={() => setDelivery(d.id)} />
                  <span className="font-semibold text-foreground">{d.id}</span>
                  <p className="mt-1 pl-6 text-xs text-muted-foreground">{d.d} · {d.c}</p>
                </label>
              ))}
            </div>
          </section>

          <section className="surface p-6">
            <h2 className="font-display text-xl text-primary">Payment</h2>
            <p className="mt-1 text-xs text-muted-foreground">Demo only — no payment is processed.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {payments.map((p) => (
                <label key={p} className={`cursor-pointer rounded-lg border p-4 text-sm ${payment === p ? "border-secondary bg-accent/10" : "border-border"}`}>
                  <input type="radio" name="payment" className="mr-2" checked={payment === p} onChange={() => setPayment(p)} />
                  <span className="font-semibold text-foreground">{p}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="surface h-fit p-5">
          <h2 className="font-display text-xl text-primary">Your Order</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {cart.map((i) => (
              <li key={i.key} className="flex gap-3">
                <img src={i.image} alt="" className="h-12 w-12 rounded object-cover" />
                <span className="flex-1">
                  <span className="block font-medium text-foreground">{i.name}</span>
                  <span className="text-xs text-muted-foreground">{i.color} · {i.size} · ×{i.qty}</span>
                </span>
                <span className="font-semibold">{inr(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{inr(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{coupon ? `Discount (${coupon.code})` : "Discount"}</span><span>{discount ? `− ${inr(discount)}` : "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping ? inr(shipping) : "Free"}</span></div>
            <div className="flex justify-between border-t border-border pt-3 font-display text-lg text-primary"><span>Total</span><span>{inr(total)}</span></div>
          </div>
          <button className="btn-base btn-gold mt-5 w-full" disabled={busy}>
            {busy ? "Placing order…" : "Place Order"}
          </button>
        </aside>
      </form>
    </main>
  );
}
