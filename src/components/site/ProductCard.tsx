import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { useStore } from "@/lib/store";
import { inr, discountPct } from "@/lib/format";
import { Stars } from "./Stars";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const saved = wishlist.includes(product.id);
  const off = discountPct(product.price, product.mrp);

  return (
    <article className="surface card-hover group flex flex-col overflow-hidden">
      <div className="relative">
        <Link to="/product/$id" params={{ id: product.id }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute left-2 top-2 flex flex-col items-start gap-1">
          {product.badge && (
            <span className={`chip ${product.badge === "Sale" ? "bg-sale text-primary-foreground" : "bg-primary text-primary-foreground"}`}>
              {product.badge}
            </span>
          )}
          {off > 0 && <span className="chip bg-accent text-accent-foreground">{off}% off</span>}
        </div>
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-sm ${saved ? "text-sale" : "text-muted-foreground"}`}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          {product.category.replace(/-/g, " ")}
        </p>
        <Link to="/product/$id" params={{ id: product.id }} className="font-semibold leading-snug text-foreground hover:text-secondary">
          {product.name}
        </Link>
        <p className="line-clamp-2 text-xs text-muted-foreground">{product.short}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Stars rating={product.rating} />
          <span>
            {product.rating} ({product.reviews})
          </span>
        </div>
        <div className="mt-auto flex items-end gap-2 pt-1">
          <span className="text-lg font-bold text-primary">{inr(product.price)}</span>
          {product.mrp > product.price && (
            <span className="text-sm text-muted-foreground line-through">{inr(product.mrp)}</span>
          )}
        </div>
        <p className={`text-xs font-semibold ${product.stock > 0 ? "text-success" : "text-destructive"}`}>
          {product.stock > 0 ? `In stock · ${product.stock} left` : "Out of stock"}
        </p>
        <button
          className="btn-base btn-primary mt-1 w-full"
          disabled={product.stock === 0}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0)
    return (
      <div className="surface p-10 text-center">
        <p className="font-display text-xl text-primary">No products found</p>
        <p className="mt-2 text-sm text-muted-foreground">Try clearing a filter or searching for something else.</p>
      </div>
    );
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
