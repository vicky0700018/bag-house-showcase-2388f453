import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { useStore } from "@/lib/store";
import { EnquiryModal } from "./EnquiryForm";

const nav = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "School Bags", to: "/category/school-bags" },
  { label: "Laptop Bags", to: "/category/laptop-backpacks" },
  { label: "Travel Bags", to: "/category/travel-bags" },
  { label: "Suitcases", to: "/category/suitcases" },
  { label: "Corporate Bags", to: "/category/corporate-bags" },
  { label: "Custom Bags", to: "/category/custom-bags" },
  { label: "Bulk Orders", to: "/bulk-orders" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const { cartCount, wishlist } = useStore();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [enq, setEnq] = useState(false);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/shop", search: { q: q.trim() || undefined } as never });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="bg-primary text-primary-foreground">
        <div className="container-page flex flex-wrap items-center justify-between gap-2 py-1.5 text-[0.7rem] tracking-wide">
          <p>20+ Years of Bag Manufacturing & Retail · Old Sangvi, Pimpri-Chinchwad</p>
          <button onClick={() => setEnq(true)} className="font-semibold text-accent hover:underline">
            Quick Enquiry
          </button>
        </div>
      </div>

      <div className="container-page flex items-center gap-4 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Chandok Bag House logo" className="h-10 w-10 rounded-md object-contain" />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold text-primary">Chandok Bag House</span>
            <span className="block text-[0.62rem] font-bold uppercase tracking-[0.24em] text-secondary">
              PS Creation
            </span>
          </span>
        </Link>

        <form onSubmit={search} className="ml-auto hidden max-w-md flex-1 lg:block">
          <input
            className="field"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search backpacks, trolleys, corporate bags…"
            aria-label="Search products"
          />
        </form>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <Link to="/account" className="btn-base btn-ghost px-2" aria-label="Account">
            <span aria-hidden>👤</span>
          </Link>
          <Link to="/wishlist" className="btn-base btn-ghost relative px-2" aria-label="Wishlist">
            <span aria-hidden>♡</span>
            {wishlist.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 rounded-full bg-secondary px-1.5 text-[0.6rem] font-bold text-primary-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="btn-base btn-ghost relative px-2" aria-label="Cart">
            <span aria-hidden>🛍</span>
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 rounded-full bg-sale px-1.5 text-[0.6rem] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="btn-base btn-ghost px-2 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span aria-hidden>☰</span>
          </button>
        </div>
      </div>

      <nav className="hidden border-t border-border lg:block">
        <div className="container-page flex flex-wrap items-center gap-x-5 gap-y-1 py-2 text-[0.8rem] font-medium">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-secondary" }}
              className="text-foreground transition-colors hover:text-secondary"
            >
              {n.label}
            </Link>
          ))}
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-card lg:hidden">
          <div className="container-page space-y-3 py-4">
            <form onSubmit={search}>
              <input className="field" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" />
            </form>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-1 text-foreground">
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <EnquiryModal open={enq} onClose={() => setEnq(false)} />
    </header>
  );
}
