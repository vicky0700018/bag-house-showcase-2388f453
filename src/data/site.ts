import catSchool from "@/assets/cat-school.jpg";
import catLaptop from "@/assets/cat-laptop.jpg";
import catTravel from "@/assets/cat-travel.jpg";
import catSuitcase from "@/assets/cat-suitcase.jpg";
import catCorporate from "@/assets/cat-corporate.jpg";
import catCustom from "@/assets/cat-custom.jpg";
import catPromotional from "@/assets/cat-promotional.jpg";
import catInstitutional from "@/assets/cat-institutional.jpg";
import hero from "@/assets/hero.jpg";
import bulk from "@/assets/bulk.jpg";
import store from "@/assets/store.jpg";

export const business = {
  name: "Chandok Bag House",
  brand: "PS Creation",
  owner: "Navneet Singh Gurmukh Singh Gandhi",
  phone: "+91 93711 11448",
  email: "gschandok@chandokbaghouse.com",
  address:
    "Shop No. 4, Union Bank ATM, Shivaprasad Building, Housing Society, near Old Sangvi, Anand Nagar, Sainath Colony, Old Sangvi, Pimpri-Chinchwad, Maharashtra 411027",
  description:
    "A premier bag manufacturing and retail establishment in Pimpri-Chinchwad, specialising in high-quality retail and corporate baggage solutions for over two decades.",
  hours: [
    { day: "Monday – Saturday", time: "10:00 AM – 9:00 PM" },
    { day: "Sunday", time: "11:00 AM – 7:00 PM" },
    { day: "Public Holidays", time: "By appointment" },
  ],
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    whatsapp: "https://wa.me/919371111448",
  },
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  image: string;
  blurb: string;
  active: boolean;
};

export const categories: Category[] = [
  { id: "c1", slug: "school-bags", name: "School Bags", image: catSchool, blurb: "Light, sturdy and back-friendly", active: true },
  { id: "c2", slug: "laptop-backpacks", name: "Laptop Backpacks", image: catLaptop, blurb: "Padded protection for daily commutes", active: true },
  { id: "c3", slug: "travel-bags", name: "Travel Bags", image: catTravel, blurb: "Duffels built for long journeys", active: true },
  { id: "c4", slug: "suitcases", name: "Suitcases", image: catSuitcase, blurb: "Cabin and check-in trolleys", active: true },
  { id: "c5", slug: "corporate-bags", name: "Corporate Bags", image: catCorporate, blurb: "Executive briefcases and messengers", active: true },
  { id: "c6", slug: "custom-bags", name: "Custom Bags", image: catCustom, blurb: "Made to your specification", active: true },
  { id: "c7", slug: "promotional-bags", name: "Promotional Bags", image: catPromotional, blurb: "Event and giveaway ranges", active: true },
  { id: "c8", slug: "institutional-bags", name: "Institutional Bags", image: catInstitutional, blurb: "Uniform bags for schools", active: true },
];

export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  active: boolean;
  order: number;
};

export const banners: Banner[] = [
  { id: "b1", title: "Carry Quality. Carry Confidence.", subtitle: "Premium Bags, Luggage & Custom Corporate Solutions for Every Journey.", cta: "Shop Collection", image: hero, active: true, order: 1 },
  { id: "b2", title: "Bulk Manufacturing, Done Right", subtitle: "Custom logo branding for corporates, schools and events.", cta: "Bulk Enquiry", image: bulk, active: true, order: 2 },
  { id: "b3", title: "Two Decades On The Shop Floor", subtitle: "Retail expertise from Old Sangvi, Pimpri-Chinchwad.", cta: "About Us", image: store, active: false, order: 3 },
];

export type Coupon = {
  code: string;
  percent: number;
  minOrder: number;
  active: boolean;
  label: string;
};

export const coupons: Coupon[] = [
  { code: "BAG10", percent: 10, minOrder: 1000, active: true, label: "10% off orders above ₹1,000" },
  { code: "WELCOME15", percent: 15, minOrder: 2000, active: true, label: "15% off orders above ₹2,000" },
  { code: "CORPORATE20", percent: 20, minOrder: 10000, active: true, label: "20% off bulk orders above ₹10,000" },
];

export const trustPoints = [
  { title: "20+ Years Experience", text: "Trusted experience in bag manufacturing and retail.", icon: "20+" },
  { title: "Custom Branding", text: "Personalised logo printing for institutions and businesses.", icon: "★" },
  { title: "Durable Quality", text: "Products selected for long-lasting everyday use.", icon: "◆" },
  { title: "B2B Manufacturing", text: "Bulk production for corporate and institutional needs.", icon: "▦" },
  { title: "After-Sales Support", text: "Reliable support even after your purchase.", icon: "✓" },
];

export const bulkServices = [
  "Corporate Laptop Bags",
  "School / Institution Bags",
  "Promotional Bags",
  "Event Bags",
  "Employee Kits",
  "Custom Logo Bags",
  "Bulk Manufacturing",
  "Custom Packaging",
];

export const faqs = [
  { q: "Do you manufacture bags with our company logo?", a: "Yes. We offer screen printing, embroidery and woven-label branding on bulk orders from 50 pieces upwards." },
  { q: "What is the minimum quantity for a bulk order?", a: "Typically 50 pieces for stock designs and 100 pieces for fully custom manufacturing." },
  { q: "Do you deliver outside Pimpri-Chinchwad?", a: "Yes, we ship across Maharashtra and to most Indian cities for bulk and retail orders." },
  { q: "What is the return policy?", a: "Unused retail products can be returned within 7 days with the original tags and invoice." },
  { q: "Do you repair bags after purchase?", a: "We provide after-sales support including zip and strap repairs on products purchased from us." },
];

export const heroImage = hero;
export const bulkImage = bulk;
export const storeImage = store;
