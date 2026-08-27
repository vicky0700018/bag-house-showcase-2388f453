import { createFileRoute } from "@tanstack/react-router";
import { ShopBrowser } from "@/components/site/ShopBrowser";

type ShopSearch = { q?: string; category?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): ShopSearch => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All Bags & Luggage — Chandok Bag House" },
      {
        name: "description",
        content:
          "Browse the full Chandok Bag House catalogue: school bags, laptop backpacks, duffels, trolleys, corporate and custom bags with filters and sorting.",
      },
      { property: "og:title", content: "Shop All Bags & Luggage — Chandok Bag House" },
      { property: "og:description", content: "Filter by category, price, rating and availability across 16 premium bag ranges." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { q, category } = Route.useSearch();
  return (
    <main className="container-page py-10">
      <p className="eyebrow">Catalogue</p>
      <h1 className="mt-2 font-display text-4xl text-primary">Shop All Bags</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Retail-ready stock from PS Creation — every product is also available for bulk manufacturing with your logo.
      </p>
      <div className="mt-8">
        <ShopBrowser initialQuery={q ?? ""} initialCategory={category ?? "all"} />
      </div>
    </main>
  );
}
