import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { inr } from "@/lib/format";
import { ConfirmDialog } from "@/components/site/Modal";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Chandok Bag House" },
      { name: "description", content: "Review the bags in your cart, apply a coupon and continue to checkout at Chandok Bag House." },
      { property: "og:title", content: "Your Cart — Chandok Bag House" },
      { property: "og:description", content: "Review your bag selection and apply demo coupons before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, setQty, removeFromCart, subtotal, discount, coupon, applyCoupon, removeCoupon, toggleWishlist } = useStore();
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState<string | null>(null);
  const shipping = cart.length === 0 || subtotal - discount >= 2000 ? 0 : 99;
  const total = Math.max(0, subtotal - discount) + shipping;

  if (cart.length === 0)
    return (
      <main className="container-page py-20">
        <div className="surface mx-auto max-w-md p-10 text-center">
          <p className="font-display text-2xl text-primary">Your cart is empty</p>
          <p className="mt-2 text-sm text-muted-foreground">Add a backpack, trolley or corporate bag to get started.</p>
          <Link to="/shop" className="btn-base btn-primary mt-6">Shop Collection</Link>
        </div>
      </main>
    );

  return (
    <main className="container-page py-10">
      <h1 className="font-display text-4xl text-primary">Shopping Cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-4">
          {cart.map((i) => (
            <div key={i.key} className="surface flex flex-col gap-4 p-4 sm:flex-row">
              <img src={i.image} alt={i.name} className="h-28 w-28 shrink-0 rounded-md object-cover" />
              <div className="flex-1">
                <Link to="/product/$id" params={{ id: i.id }} className="font-semibold text-foreground hover:text-secondary">
                  {i.name}
                </Link>
                <p className="mt-1 text-xs text-muted-foreground">
                  {i.color} · {i.size}
                </p>
                <p className="mt-2 font-semibold text-primary">{inr(i.price)}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center rounded-md border border-border bg-card">
                    <button className="px-3 py-1.5" onClick={() => setQty(i.key, i.qty - 1)} aria-label="Decrease">−</button>
                    <span className="w-9 text-center text-sm font-semibold">{i.qty}</span>
                    <button className="px-3 py-1.5" onClick={() => setQty(i.key, i.qty + 1)} aria-label="Increase">+</button>
                  </div>
                  <button className="text-xs font-semibold text-muted-foreground hover:text-secondary" onClick={() => toggleWishlist(i.id)}>
                    Move to wishlist
                  </button>
                  <button className="text-xs font-semibold text-destructive hover:underline" onClick={() => setConfirm(i.key)}>
                    Remove
                  </button>
                </div>
              </div>
              <p className="text-right font-display text-lg text-primary">{inr(i.price * i.qty)}</p>
            </div>
          ))}
        </div>

        <aside className="surface h-fit p-5">
          <h2 className="font-display text-xl text-primary">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <Row label="Subtotal" value={inr(subtotal)} />
            <Row label={coupon ? `Discount (${coupon.code})` : "Discount"} value={discount ? `− ${inr(discount)}` : "—"} />
            <Row label="Shipping" value={shipping ? inr(shipping) : "Free"} />
            <div className="mt-3 flex justify-between border-t border-border pt-3 font-display text-lg text-primary">
              <span>Grand Total</span>
              <span>{inr(total)}</span>
            </div>
          </div>

          <div className="mt-5">
            <p className="label-x">Coupon code</p>
            {coupon ? (
              <div className="flex items-center justify-between rounded-md border border-success/40 bg-success/10 px-3 py-2 text-sm">
                <span className="font-semibold text-success">{coupon.code} applied</span>
                <button className="text-xs font-semibold text-destructive" onClick={removeCoupon}>Remove</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input className="field" value={code} onChange={(e) => setCode(e.target.value)} placeholder="BAG10" />
                <button className="btn-base btn-outline" onClick={() => applyCoupon(code)}>Apply</button>
              </div>
            )}
            <p className="mt-2 text-xs text-muted-foreground">Try BAG10, WELCOME15 or CORPORATE20.</p>
          </div>

          <Link to="/checkout" className="btn-base btn-primary mt-5 w-full">Proceed to Checkout</Link>
          <Link to="/shop" className="btn-base btn-ghost mt-2 w-full">Continue shopping</Link>
        </aside>
      </div>

      <ConfirmDialog
        open={confirm !== null}
        message="Remove this item from your cart?"
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          if (confirm) removeFromCart(confirm);
          setConfirm(null);
        }}
      />
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}
