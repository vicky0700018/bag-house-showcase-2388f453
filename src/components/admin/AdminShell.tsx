import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useStore } from "@/lib/store";

const items = [
  { label: "Dashboard", to: "/admin/dashboard" },
  { label: "Products", to: "/admin/products" },
  { label: "Categories", to: "/admin/categories" },
  { label: "Orders", to: "/admin/orders" },
  { label: "Customers", to: "/admin/customers" },
  { label: "Enquiries", to: "/admin/enquiries" },
  { label: "Bulk Orders", to: "/admin/bulk-orders" },
  { label: "Banners", to: "/admin/banners" },
  { label: "Coupons", to: "/admin/coupons" },
  { label: "Settings", to: "/admin/settings" },
];

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const { isAdmin, adminLogout, ready } = useStore();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ready && !isAdmin) navigate({ to: "/admin/login" });
  }, [ready, isAdmin, navigate]);

  useEffect(() => setOpen(false), [pathname]);

  if (!ready || !isAdmin)
    return (
      <div className="grid min-h-screen place-items-center bg-muted">
        <p className="text-sm text-muted-foreground">Checking admin session…</p>
      </div>
    );

  const sidebar = (
    <nav className="flex h-full flex-col gap-1 p-4">
      <div className="px-2 pb-4">
        <p className="font-display text-lg text-accent">Chandok Admin</p>
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-background/50">PS Creation</p>
      </div>
      {items.map((i) => (
        <Link
          key={i.to}
          to={i.to}
          className="rounded-md px-3 py-2 text-sm text-background/75 transition-colors hover:bg-background/10 hover:text-accent"
          activeProps={{ className: "bg-background/12 text-accent font-semibold" }}
        >
          {i.label}
        </Link>
      ))}
      <div className="mt-auto space-y-1 border-t border-background/15 pt-3">
        <Link to="/" className="block rounded-md px-3 py-2 text-sm text-background/75 hover:text-accent">
          View Website
        </Link>
        <button
          onClick={() => {
            adminLogout();
            navigate({ to: "/admin/login" });
          }}
          className="w-full rounded-md px-3 py-2 text-left text-sm text-background/75 hover:text-destructive"
        >
          Logout
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-muted">
      <aside className="fixed inset-y-0 left-0 hidden w-60 bg-ink text-background lg:block">{sidebar}</aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/60" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-ink text-background">{sidebar}</aside>
        </div>
      )}

      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-card px-4 py-3">
          <button className="btn-base btn-outline px-2 py-1 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            ☰
          </button>
          <h1 className="font-display text-xl text-primary">{title}</h1>
          <span className="ml-auto hidden text-xs text-muted-foreground sm:block">admin@chandokbaghouse.com</span>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

export function StatsCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="surface p-5">
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl text-primary">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function TableWrap({ children }: { children: ReactNode }) {
  return (
    <div className="surface overflow-x-auto">
      <table className="w-full min-w-[52rem] text-left text-sm">{children}</table>
    </div>
  );
}
