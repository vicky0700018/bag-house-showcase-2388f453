import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";
import p9 from "@/assets/p9.jpg";
import p10 from "@/assets/p10.jpg";
import p11 from "@/assets/p11.jpg";
import p12 from "@/assets/p12.jpg";
import p13 from "@/assets/p13.jpg";
import p14 from "@/assets/p14.jpg";
import p15 from "@/assets/p15.jpg";
import p16 from "@/assets/p16.jpg";

export type Product = {
  id: string;
  name: string;
  category: string; // category slug
  image: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  short: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  colors: string[];
  sizes?: string[];
  stock: number;
  badge: "New" | "Bestseller" | "Premium" | "Sale" | "";
  featured: boolean;
  active: boolean;
};

const spec = (material: string, capacity: string, warranty: string) => [
  { label: "Material", value: material },
  { label: "Capacity", value: capacity },
  { label: "Warranty", value: warranty },
  { label: "Brand", value: "PS Creation" },
  { label: "Country of Origin", value: "India" },
];

export const products: Product[] = [
  {
    id: "csb-101", name: "Classic School Backpack", category: "school-bags", image: p1, price: 1049, mrp: 1499, rating: 4.5, reviews: 128,
    short: "Everyday school backpack with padded straps and a roomy main compartment.",
    description: "A dependable school companion built from tear-resistant polyester with reinforced stitching at every stress point. The ventilated back panel and contoured shoulder straps keep heavy textbook loads comfortable through the school week.",
    features: ["Reinforced bar-tack stitching", "Ventilated padded back panel", "Side mesh bottle pockets", "Water-repellent finish"],
    specs: spec("600D Polyester", "28 Litres", "1 Year"), colors: ["Navy", "Red", "Black"], sizes: ["Small", "Medium"], stock: 42, badge: "Bestseller", featured: true, active: true,
  },
  {
    id: "plb-102", name: "Premium Laptop Backpack", category: "laptop-backpacks", image: p2, price: 2199, mrp: 3299, rating: 4.7, reviews: 214,
    short: "Padded 15.6\" laptop sleeve with anti-theft rear pocket and USB port.",
    description: "Designed for the daily commute, this backpack cradles a 15.6-inch laptop in a suspended padded sleeve so drops never reach your device. A concealed rear pocket keeps your wallet safe in crowded transit.",
    features: ["Suspended 15.6\" laptop sleeve", "External USB charging port", "Anti-theft rear pocket", "Luggage trolley strap"],
    specs: spec("Water-resistant Nylon", "32 Litres", "2 Years"), colors: ["Charcoal", "Navy", "Grey"], stock: 30, badge: "Premium", featured: true, active: true,
  },
  {
    id: "eob-103", name: "Executive Office Backpack", category: "corporate-bags", image: p3, price: 3299, mrp: 4499, rating: 4.6, reviews: 96,
    short: "Slim leather-finish backpack for boardroom-to-commute versatility.",
    description: "A refined silhouette in soft leather-finish PU with brushed gold hardware. Slim enough for a meeting room, organised enough for a full working day.",
    features: ["Soft leather-finish exterior", "Gold-tone YKK zips", "Organiser panel", "Water-resistant lining"],
    specs: spec("Premium PU Leather", "24 Litres", "2 Years"), colors: ["Black", "Tan"], stock: 18, badge: "Premium", featured: true, active: true,
  },
  {
    id: "wtb-104", name: "Waterproof Travel Backpack", category: "travel-bags", image: p4, price: 2799, mrp: 3999, rating: 4.4, reviews: 87,
    short: "Weather-sealed rucksack with roll-top closure and rain cover.",
    description: "Built for monsoon travel and weekend treks, with a coated shell, sealed seams and a tuck-away rain cover for downpours.",
    features: ["Tuck-away rain cover", "Roll-top flap closure", "Compression side straps", "Padded hip belt"],
    specs: spec("Coated Ripstop Nylon", "45 Litres", "2 Years"), colors: ["Olive", "Black", "Navy"], sizes: ["45L", "55L"], stock: 25, badge: "New", featured: true, active: true,
  },
  {
    id: "ucb-105", name: "Urban College Backpack", category: "school-bags", image: p5, price: 1699, mrp: 2299, rating: 4.3, reviews: 143,
    short: "Canvas and leather campus backpack with laptop divider.",
    description: "Heavy canvas body with a genuine leather base that ages beautifully. A relaxed campus shape that still fits a 14-inch laptop and a day's books.",
    features: ["Cotton canvas body", "Leather reinforced base", "14\" laptop divider", "Flap-and-strap closure"],
    specs: spec("Cotton Canvas & Leather", "26 Litres", "1 Year"), colors: ["Mustard", "Olive", "Grey"], stock: 36, badge: "Sale", featured: true, active: true,
  },
  {
    id: "ltd-106", name: "Large Travel Duffel", category: "travel-bags", image: p6, price: 2399, mrp: 3199, rating: 4.5, reviews: 74,
    short: "High-capacity duffel with detachable shoulder strap.",
    description: "A no-nonsense hauler for wedding trips and long weekends. The wide U-shaped opening lets you pack the bag flat instead of digging through it.",
    features: ["Wide U-shape opening", "Detachable padded strap", "Reinforced base panel", "Wet-kit end pocket"],
    specs: spec("Tarpaulin-backed Polyester", "60 Litres", "1 Year"), colors: ["Black", "Navy"], sizes: ["60L", "80L"], stock: 21, badge: "Bestseller", featured: true, active: true,
  },
  {
    id: "pct-107", name: "Premium Cabin Trolley", category: "suitcases", image: p7, price: 4499, mrp: 6499, rating: 4.8, reviews: 189,
    short: "Cabin-legal hard trolley with 360° silent spinner wheels.",
    description: "Sized to Indian domestic cabin allowances with a scratch-resistant shell, TSA lock and eight silent wheels that glide across airport marble.",
    features: ["Cabin-legal 55cm size", "360° silent spinner wheels", "TSA combination lock", "Compression straps inside"],
    specs: spec("Polycarbonate Shell", "38 Litres", "3 Years"), colors: ["Navy", "Champagne", "Black"], sizes: ["Cabin 55cm"], stock: 15, badge: "Premium", featured: true, active: true,
  },
  {
    id: "hss-108", name: "Hard Shell Suitcase", category: "suitcases", image: p8, price: 6999, mrp: 9999, rating: 4.6, reviews: 112,
    short: "Check-in size armour shell with dual-density corners.",
    description: "The long-haul workhorse: a ribbed armour shell with reinforced corner guards, a fully lined interior and a cross-strap system that keeps clothes flat.",
    features: ["Reinforced corner guards", "Dual-density ribbed shell", "Fully lined interior", "Expandable +5cm zip"],
    specs: spec("ABS + Polycarbonate", "92 Litres", "3 Years"), colors: ["Silver", "Charcoal"], sizes: ["Check-in 68cm", "Large 78cm"], stock: 9, badge: "", featured: false, active: true,
  },
  {
    id: "clb-109", name: "Corporate Laptop Bag", category: "corporate-bags", image: p9, price: 1899, mrp: 2599, rating: 4.4, reviews: 156,
    short: "Slim office briefcase sized for 15.6\" laptops and files.",
    description: "Our most-ordered corporate gifting product. Clean lines, a padded laptop bay and a file section that swallows a full day of paperwork.",
    features: ["Padded 15.6\" laptop bay", "Front document organiser", "Detachable shoulder strap", "Bulk branding ready"],
    specs: spec("Ballistic Nylon", "18 Litres", "1 Year"), colors: ["Black", "Grey", "Navy"], stock: 60, badge: "Bestseller", featured: true, active: true,
  },
  {
    id: "emb-110", name: "Executive Messenger Bag", category: "corporate-bags", image: p10, price: 3899, mrp: 5299, rating: 4.7, reviews: 68,
    short: "Full-grain look messenger with solid brass buckles.",
    description: "A classic satchel profile in rich tan with antique brass hardware, hand-finished edges and a soft suede-feel lining.",
    features: ["Antique brass buckles", "Hand-finished edges", "Suede-feel lining", "Adjustable leather strap"],
    specs: spec("Leather-finish PU", "16 Litres", "2 Years"), colors: ["Tan", "Dark Brown"], stock: 12, badge: "Premium", featured: false, active: true,
  },
  {
    id: "isb-111", name: "Institutional School Bag", category: "institutional-bags", image: p11, price: 899, mrp: 1199, rating: 4.2, reviews: 231,
    short: "Uniform school bag with reflective strips and name tag.",
    description: "Supplied to schools across Pune and Pimpri-Chinchwad in uniform colours, with a printed name panel and high-visibility reflective strips for road safety.",
    features: ["High-visibility reflective strips", "Printed name tag panel", "Uniform colour matching", "Bulk supply ready"],
    specs: spec("420D Polyester", "22 Litres", "6 Months"), colors: ["Royal Blue", "Maroon", "Green"], sizes: ["Junior", "Senior"], stock: 120, badge: "", featured: false, active: true,
  },
  {
    id: "clg-112", name: "Custom Logo Backpack", category: "custom-bags", image: p12, price: 1299, mrp: 1799, rating: 4.3, reviews: 54,
    short: "Blank canvas backpack ready for your embroidered logo.",
    description: "Our base model for custom orders. Choose your fabric colour, zip colour and branding method — embroidery, screen print or woven label.",
    features: ["Embroidery-ready front panel", "Choice of 12 fabric colours", "Woven label option", "MOQ 50 pieces"],
    specs: spec("600D Polyester", "25 Litres", "1 Year"), colors: ["Maroon", "Navy", "Black", "Grey"], stock: 200, badge: "New", featured: true, active: true,
  },
  {
    id: "btb-113", name: "Business Travel Backpack", category: "laptop-backpacks", image: p13, price: 3599, mrp: 4799, rating: 4.6, reviews: 91,
    short: "Cabin-friendly backpack with trolley sleeve and shoe pocket.",
    description: "Two nights away without a suitcase. A clamshell main compartment, dedicated shoe pocket and trolley sleeve for airport transfers.",
    features: ["Clamshell opening", "Dedicated shoe compartment", "Trolley pass-through sleeve", "Quick-access top pocket"],
    specs: spec("Water-resistant Polyester", "36 Litres", "2 Years"), colors: ["Slate Blue", "Black"], stock: 22, badge: "New", featured: true, active: true,
  },
  {
    id: "lts-114", name: "Lightweight Travel Suitcase", category: "suitcases", image: p14, price: 3799, mrp: 5299, rating: 4.4, reviews: 78,
    short: "Under-3kg soft-shell trolley in deep teal.",
    description: "For travellers who fight the baggage scale. A featherweight frame with expandable capacity and smooth double spinner wheels.",
    features: ["Under 3 kg empty weight", "Expandable capacity", "Double spinner wheels", "Front quick-access pocket"],
    specs: spec("Soft-shell Polyester", "64 Litres", "2 Years"), colors: ["Teal", "Navy", "Wine"], sizes: ["Medium 65cm"], stock: 17, badge: "Sale", featured: false, active: true,
  },
  {
    id: "prb-115", name: "Promotional Backpack", category: "promotional-bags", image: p15, price: 549, mrp: 799, rating: 4.0, reviews: 302,
    short: "Budget event backpack for conferences and giveaways.",
    description: "Cost-effective and colourful, designed for conference kits and college fests. Large print area on the front panel for sponsor logos.",
    features: ["Large front print area", "Lightweight build", "12 stock colours", "MOQ 100 pieces"],
    specs: spec("300D Polyester", "18 Litres", "3 Months"), colors: ["Orange", "Blue", "Green", "Red"], stock: 320, badge: "", featured: false, active: true,
  },
  {
    id: "pwt-116", name: "Premium Weekend Travel Bag", category: "travel-bags", image: p16, price: 4299, mrp: 5999, rating: 4.8, reviews: 63,
    short: "Waxed canvas holdall with leather trim and brass feet.",
    description: "The bag you take to the hills. Waxed canvas that weathers gracefully, full leather trim, brass protective feet and a shoulder strap you can wear all day.",
    features: ["Waxed cotton canvas", "Full leather trim", "Brass protective feet", "Removable shoulder pad"],
    specs: spec("Waxed Canvas & Leather", "42 Litres", "3 Years"), colors: ["Brown", "Olive"], stock: 8, badge: "Premium", featured: true, active: true,
  },
];

export const findProduct = (id: string) => products.find((p) => p.id === id);
export const discountOf = (p: { price: number; mrp: number }) =>
  Math.round(((p.mrp - p.price) / p.mrp) * 100);
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
