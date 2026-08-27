import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categories } from "@/data/site";
import { ShopBrowser } from "@/components/site/ShopBrowser";

export const Route = createFileRoute("/category/$category")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Category unavailable — Chandok Bag House" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.category;
    return {
      meta: [
        { title: `${c.name} — Chandok Bag House` },
        { name: "description", content: `${c.name}: ${c.blurb}. Shop premium ${c.name.toLowerCase()} from Chandok Bag House, Pimpri-Chinchwad.` },
        { property: "og:title", content: `${c.name} — Chandok Bag House` },
        { property: "og:description", content: `${c.name}: ${c.blurb}.` },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  return (
    <main className="container-page py-10">
      <nav className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-secondary">Home</Link> / <Link to="/shop" className="hover:text-secondary">Shop</Link> /{" "}
        <span className="text-foreground">{category.name}</span>
      </nav>
      <div className="surface mt-4 grid overflow-hidden lg:grid-cols-[1fr_20rem]">
        <div className="p-8">
          <p className="eyebrow">Category</p>
          <h1 className="mt-2 font-display text-4xl text-primary">{category.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{category.blurb}</p>
        </div>
        <img src={category.image} alt={category.name} className="h-48 w-full object-cover lg:h-full" />
      </div>
      <div className="mt-8">
        <ShopBrowser initialCategory={category.slug} lockCategory />
      </div>
    </main>
  );
}
