import { useMemo, useState } from "react";
import { categories } from "@/data/site";
import { useActiveProducts } from "@/lib/store";
import { ProductGrid } from "./ProductCard";

const sorts = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Rating" },
  { id: "newest", label: "Newest" },
  { id: "best", label: "Best Selling" },
];

export function ShopBrowser({
  initialQuery = "",
  initialCategory = "all",
  lockCategory = false,
}: {
  initialQuery?: string;
  initialCategory?: string;
  lockCategory?: boolean;
}) {
  const all = useActiveProducts();
  const [q, setQ] = useState(initialQuery);
  const [cat, setCat] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(6000);
  const [minRating, setMinRating] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState("featured");
  const [visible, setVisible] = useState(8);
  const [drawer, setDrawer] = useState(false);

  const filtered = useMemo(() => {
    let list = all.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      if (inStock && p.stock === 0) return false;
      if (q.trim()) {
        const t = `${p.name} ${p.category} ${p.short}`.toLowerCase();
        if (!t.includes(q.trim().toLowerCase())) return false;
      }
      return true;
    });
    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "best") list.sort((a, b) => b.reviews - a.reviews);
    if (sort === "newest") list.sort((a, b) => (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0));
    if (sort === "featured") list.sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [all, cat, maxPrice, minRating, inStock, q, sort]);

  const reset = () => {
    setQ("");
    if (!lockCategory) setCat("all");
    setMaxPrice(6000);
    setMinRating(0);
    setInStock(false);
  };

  const filters = (
    <div className="space-y-6">
      <div>
        <p className="label-x">Search</p>
        <input className="field" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" />
      </div>
      {!lockCategory && (
        <div>
          <p className="label-x">Category</p>
          <div className="space-y-1.5 text-sm">
            {[{ slug: "all", name: "All Categories" }, ...categories].map((c) => (
              <label key={c.slug} className="flex cursor-pointer items-center gap-2">
                <input type="radio" name="cat" checked={cat === c.slug} onChange={() => setCat(c.slug)} />
                <span>{c.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      <div>
        <p className="label-x">Max price: ₹{maxPrice.toLocaleString("en-IN")}</p>
        <input type="range" min={500} max={6000} step={100} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[var(--secondary)]" />
      </div>
      <div>
        <p className="label-x">Minimum rating</p>
        <div className="flex flex-wrap gap-2">
          {[0, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`chip border border-border ${minRating === r ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}
            >
              {r === 0 ? "Any" : `${r}★ +`}
            </button>
          ))}
        </div>
      </div>
      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
        In stock only
      </label>
      <button className="btn-base btn-outline w-full" onClick={reset}>
        Clear filters
      </button>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      <aside className="surface hidden h-fit p-5 lg:block">{filters}</aside>

      <div>
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <p className="text-sm text-muted-foreground">
            {filtered.length} product{filtered.length === 1 ? "" : "s"}
          </p>
          <button className="btn-base btn-outline lg:hidden" onClick={() => setDrawer(true)}>
            Filters
          </button>
          <label className="ml-auto flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Sort</span>
            <select className="field w-auto" value={sort} onChange={(e) => setSort(e.target.value)}>
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <ProductGrid products={filtered.slice(0, visible)} />

        {visible < filtered.length && (
          <div className="mt-8 text-center">
            <button className="btn-base btn-primary" onClick={() => setVisible((v) => v + 8)}>
              Load more products
            </button>
          </div>
        )}
      </div>

      {drawer && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-ink/60" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-sm overflow-y-auto bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-lg text-primary">Filters</p>
              <button onClick={() => setDrawer(false)} className="btn-base btn-ghost px-2" aria-label="Close filters">✕</button>
            </div>
            {filters}
            <button className="btn-base btn-primary mt-4 w-full" onClick={() => setDrawer(false)}>
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
