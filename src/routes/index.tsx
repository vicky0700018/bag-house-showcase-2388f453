import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, heroImage, bulkImage, storeImage } from "@/data/site";
import { useActiveProducts, useStore } from "@/lib/store";
import { ProductGrid } from "@/components/site/ProductCard";
import { TrustSection } from "@/components/site/TrustSection";
import { EnquiryModal } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chandok Bag House — Premium Bags, Luggage & Corporate Solutions" },
      {
        name: "description",
        content:
          "Shop school bags, laptop backpacks, travel luggage and suitcases from Chandok Bag House, Pimpri-Chinchwad. Custom logo branding and bulk B2B manufacturing.",
      },
      { property: "og:title", content: "Chandok Bag House — Carry Quality. Carry Confidence." },
      {
        property: "og:description",
        content: "Premium bags, luggage and custom corporate solutions with 20+ years of manufacturing experience.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const products = useActiveProducts();
  const { adminBanners } = useStore();
  const [enq, setEnq] = useState(false);
  const featured = products.filter((p) => p.featured).concat(products.filter((p) => !p.featured)).slice(0, 8);
  const secondary = adminBanners.filter((b) => b.active).slice(1, 2);

  return (
    <main>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img src={heroImage} alt="Premium luggage and backpacks by Chandok Bag House" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="container-page relative grid gap-8 py-20 md:py-28 lg:grid-cols-2">
          <div className="fade-up max-w-xl">
            <p className="eyebrow text-accent">Chandok Bag House · PS Creation</p>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
              Carry Quality. Carry Confidence.
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/85">
              Premium Bags, Luggage & Custom Corporate Solutions for Every Journey.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-base btn-gold">Shop Collection</Link>
              <Link to="/bulk-orders" className="btn-base btn-outline">Bulk & Corporate Enquiry</Link>
            </div>
            <p className="mt-8 border-t border-primary-foreground/20 pt-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              20+ Years of Experience | Retail & B2B Manufacturing | Custom Branding
            </p>
          </div>
        </div>
      </section>

      <TrustSection />

      <section className="container-page py-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Shop by category</p>
            <h2 className="mt-2 font-display text-3xl text-primary">Built for school, work and travel</h2>
          </div>
          <Link to="/shop" className="btn-base btn-outline">View all products</Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/category/$category"
              params={{ category: c.slug }}
              className="surface card-hover group overflow-hidden"
            >
              <img src={c.image} alt={c.name} loading="lazy" className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="p-4">
                <h3 className="text-base font-semibold text-primary">{c.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page py-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Featured</p>
            <h2 className="mt-2 font-display text-3xl text-primary">Bestsellers this season</h2>
          </div>
          <Link to="/shop" className="btn-base btn-outline">Browse the shop</Link>
        </div>
        <div className="mt-8">
          <ProductGrid products={featured} />
        </div>
      </section>

      {secondary.map((b) => (
        <section key={b.id} className="container-page pb-14">
          <div className="surface grid overflow-hidden lg:grid-cols-2">
            <img src={b.image} alt={b.title} loading="lazy" className="h-64 w-full object-cover lg:h-full" />
            <div className="p-8 md:p-12">
              <p className="eyebrow">B2B & Institutional</p>
              <h2 className="mt-3 font-display text-3xl text-primary">{b.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{b.subtitle}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/bulk-orders" className="btn-base btn-primary">{b.cta}</Link>
                <button className="btn-base btn-outline" onClick={() => setEnq(true)}>Talk to us</button>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="container-page pb-16">
        <div className="surface grid overflow-hidden lg:grid-cols-2">
          <div className="order-2 p-8 md:p-12 lg:order-1">
            <p className="eyebrow">Newsletter</p>
            <h2 className="mt-3 font-display text-3xl text-primary">Offers, new arrivals and bulk deals</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Join our mailing list for seasonal school-bag drops and corporate manufacturing offers.
            </p>
            <NewsletterForm />
          </div>
          <img src={storeImage} alt="Chandok Bag House retail store" loading="lazy" className="order-1 h-56 w-full object-cover lg:order-2 lg:h-full" />
        </div>
      </section>

      <img src={bulkImage} alt="" aria-hidden="true" className="hidden" />
      <EnquiryModal open={enq} onClose={() => setEnq(false)} />
    </main>
  );
}

function NewsletterForm() {
  const { toast } = useStore();
  const [email, setEmail] = useState("");
  return (
    <form
      className="mt-6 flex flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(email)) return toast("Enter a valid email address", "error");
        setEmail("");
        toast("Subscribed — welcome to Chandok Bag House");
      }}
    >
      <input className="field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email address" />
      <button className="btn-base btn-gold">Subscribe</button>
    </form>
  );
}
