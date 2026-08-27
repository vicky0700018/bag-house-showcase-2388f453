import { Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";

export function Footer() {
  const { settings } = useStore();
  return (
    <footer className="mt-20 bg-ink text-background">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-xl text-accent">Chandok Bag House</h3>
          <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-secondary">PS Creation</p>
          <p className="mt-4 text-sm leading-relaxed text-background/70">{settings.description}</p>
          <p className="mt-4 text-sm text-background/70">
            {settings.phone}
            <br />
            {settings.email}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-background">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <li><Link to="/shop" className="hover:text-accent">Shop</Link></li>
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link to="/bulk-orders" className="hover:text-accent">Bulk Orders</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-background">Categories</h4>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            <li><Link to="/category/$category" params={{ category: "school-bags" }} className="hover:text-accent">School Bags</Link></li>
            <li><Link to="/category/$category" params={{ category: "laptop-backpacks" }} className="hover:text-accent">Laptop Bags</Link></li>
            <li><Link to="/category/$category" params={{ category: "travel-bags" }} className="hover:text-accent">Travel Bags</Link></li>
            <li><Link to="/category/$category" params={{ category: "suitcases" }} className="hover:text-accent">Suitcases</Link></li>
            <li><Link to="/category/$category" params={{ category: "corporate-bags" }} className="hover:text-accent">Corporate Bags</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-background">Customer Support</h4>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            <li><Link to="/contact" className="hover:text-accent">Contact Us</Link></li>
            <li><Link to="/contact" hash="shipping" className="hover:text-accent">Shipping</Link></li>
            <li><Link to="/contact" hash="returns" className="hover:text-accent">Returns</Link></li>
            <li><Link to="/contact" hash="faq" className="hover:text-accent">FAQ</Link></li>
            <li><Link to="/bulk-orders" className="hover:text-accent">Bulk Enquiry</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/15">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-background/55 sm:flex-row">
          <p>© 2026 Chandok Bag House. All Rights Reserved.</p>
          <Link to="/admin/login" className="text-background/40 transition-colors hover:text-accent">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
