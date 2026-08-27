import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { products } from "@/data/products";
import { useStore } from "@/lib/store";
import { inr, discountPct } from "@/lib/format";
import { Stars } from "@/components/site/Stars";
import { ProductGrid } from "@/components/site/ProductCard";
import { EnquiryModal } from "@/components/site/EnquiryForm";

const tabs = ["Description", "Features", "Specifications", "Shipping", "Returns", "Reviews"] as const;

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Product unavailable — Chandok Bag House" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — Chandok Bag House` },
        { name: "description", content: p.short },
        { property: "og:title", content: `${p.name} — Chandok Bag House` },
        { property: "og:description", content: p.short },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const navigate = useNavigate();
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes?.[0] ?? "Standard");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Description");
  const [enq, setEnq] = useState(false);

  const others = useMemo(() => products.filter((p) => p.id !== product.id), [product.id]);
  const gallery = useMemo(() => {
    const support = others.filter((p) => p.category === product.category).concat(others).slice(0, 3);
    return [product.image, ...support.map((p) => p.image)];
  }, [others, product]);
  const [active, setActive] = useState(0);
  const related = useMemo(
    () => others.filter((p) => p.category === product.category).concat(others).slice(0, 4),
    [others, product.category],
  );

  const off = discountPct(product.price, product.mrp);
  const saved = wishlist.includes(product.id);

  return (
    <main className="container-page py-10">
      <nav className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-secondary">Home</Link> /{" "}
        <Link to="/category/$category" params={{ category: product.category }} className="hover:text-secondary">
          {product.category.replace(/-/g, " ")}
        </Link>{" "}
        / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="surface overflow-hidden">
            <img src={gallery[active]} alt={`${product.name} view ${active + 1}`} className="aspect-square w-full object-cover" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {gallery.map((g, i) => (
              <button
                key={g}
                onClick={() => setActive(i)}
                className={`overflow-hidden rounded-md border-2 ${i === active ? "border-secondary" : "border-border"}`}
                aria-label={`View image ${i + 1}`}
              >
                <img src={g} alt="" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          {product.badge && <span className="chip bg-primary text-primary-foreground">{product.badge}</span>}
          <h1 className="mt-3 font-display text-3xl text-primary md:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Stars rating={product.rating} />
            <span>{product.rating} · {product.reviews} reviews</span>
          </div>
          <div className="mt-4 flex flex-wrap items-end gap-3">
            <span className="font-display text-3xl text-primary">{inr(product.price)}</span>
            {product.mrp > product.price && (
              <>
                <span className="text-lg text-muted-foreground line-through">{inr(product.mrp)}</span>
                <span className="chip bg-sale text-primary-foreground">{off}% off</span>
              </>
            )}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.short}</p>

          <div className="mt-6">
            <p className="label-x">Colour</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`chip border ${color === c ? "border-secondary bg-secondary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {product.sizes && (
            <div className="mt-5">
              <p className="label-x">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`chip border ${size === s ? "border-secondary bg-secondary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 flex items-center gap-4">
            <div>
              <p className="label-x">Quantity</p>
              <div className="inline-flex items-center rounded-md border border-border bg-card">
                <button className="px-3 py-2" onClick={() => setQty((n) => Math.max(1, n - 1))} aria-label="Decrease quantity">−</button>
                <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                <button className="px-3 py-2" onClick={() => setQty((n) => Math.min(product.stock || 1, n + 1))} aria-label="Increase quantity">+</button>
              </div>
            </div>
            <p className={`mt-5 text-sm font-semibold ${product.stock > 0 ? "text-success" : "text-destructive"}`}>
              {product.stock > 0 ? `In stock · ${product.stock} available` : "Currently out of stock"}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button className="btn-base btn-primary" disabled={!product.stock} onClick={() => addToCart(product, { color, size, qty })}>
              Add to Cart
            </button>
            <button
              className="btn-base btn-gold"
              disabled={!product.stock}
              onClick={() => {
                addToCart(product, { color, size, qty });
                navigate({ to: "/checkout" });
              }}
            >
              Buy Now
            </button>
            <button className="btn-base btn-outline" onClick={() => toggleWishlist(product.id)}>
              {saved ? "♥ Saved" : "♡ Wishlist"}
            </button>
            <button className="btn-base btn-ghost" onClick={() => setEnq(true)}>
              Enquire about this product
            </button>
          </div>
        </div>
      </div>

      <section className="mt-14">
        <div className="flex flex-wrap gap-2 border-b border-border pb-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`btn-base ${tab === t ? "btn-primary" : "btn-ghost"} px-4 py-1.5 text-xs`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="surface mt-5 p-6 text-sm leading-relaxed text-muted-foreground">
          {tab === "Description" && <p>{product.description}</p>}
          {tab === "Features" && (
            <ul className="list-disc space-y-2 pl-5">
              {product.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}
          {tab === "Specifications" && (
            <dl className="grid gap-3 sm:grid-cols-2">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between border-b border-border pb-2">
                  <dt className="font-semibold text-foreground">{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {tab === "Shipping" && (
            <p>
              Standard delivery across Maharashtra in 3–5 working days (₹99, free above ₹2,000). Express delivery in 1–2
              working days for ₹199. Bulk orders are dispatched on an agreed schedule after sample approval.
            </p>
          )}
          {tab === "Returns" && (
            <p>
              Unused products can be returned within 7 days with original tags and invoice. Custom-branded and bulk
              manufactured orders are non-returnable, but we offer after-sales repair support on zips, wheels and straps.
            </p>
          )}
          {tab === "Reviews" && (
            <div className="space-y-4">
              {[
                { n: "Rohit D.", r: 5, t: "Excellent build quality, stitching feels commercial grade." },
                { n: "Sneha K.", r: 4, t: "Great value for the price. Shop staff helped pick the right size." },
                { n: "Manoj K.", r: 5, t: "Ordered in bulk for our office — branding came out crisp." },
              ].map((rv) => (
                <div key={rv.n} className="border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{rv.n}</span>
                    <Stars rating={rv.r} />
                  </div>
                  <p className="mt-1">{rv.t}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-primary">You may also like</h2>
        <div className="mt-6">
          <ProductGrid products={related} />
        </div>
      </section>

      <EnquiryModal open={enq} onClose={() => setEnq(false)} product={product.name} />
    </main>
  );
}
