export const adminCredentials = {
  email: "admin@chandokbaghouse.com",
  password: "Admin@123",
};

export type OrderStatus = "Pending" | "Confirmed" | "Packed" | "Shipped" | "Delivered" | "Cancelled";

export type AdminOrder = {
  id: string;
  customer: string;
  date: string;
  items: string;
  amount: number;
  payment: string;
  status: OrderStatus;
};

export const seedOrders: AdminOrder[] = [
  { id: "CBH-24801", customer: "Rohit Deshmukh", date: "2026-08-21", items: "Premium Laptop Backpack ×1", amount: 2199, payment: "UPI", status: "Delivered" },
  { id: "CBH-24802", customer: "Sneha Kulkarni", date: "2026-08-22", items: "Classic School Backpack ×2", amount: 2098, payment: "COD", status: "Shipped" },
  { id: "CBH-24803", customer: "Zenith Infotech", date: "2026-08-23", items: "Corporate Laptop Bag ×60", amount: 113940, payment: "Net Banking", status: "Confirmed" },
  { id: "CBH-24804", customer: "Aditya Pawar", date: "2026-08-24", items: "Premium Cabin Trolley ×1", amount: 4499, payment: "Card", status: "Packed" },
  { id: "CBH-24805", customer: "Meera Joshi", date: "2026-08-25", items: "Urban College Backpack ×1", amount: 1699, payment: "UPI", status: "Pending" },
  { id: "CBH-24806", customer: "St. Xavier's School", date: "2026-08-25", items: "Institutional School Bag ×150", amount: 134850, payment: "Net Banking", status: "Confirmed" },
  { id: "CBH-24807", customer: "Farhan Shaikh", date: "2026-08-26", items: "Large Travel Duffel ×1", amount: 2399, payment: "COD", status: "Cancelled" },
];

export type AdminCustomer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  orders: number;
  spend: number;
  status: "Active" | "Inactive";
  city: string;
};

export const seedCustomers: AdminCustomer[] = [
  { id: "CU-01", name: "Rohit Deshmukh", phone: "+91 98220 11223", email: "rohit.d@example.com", orders: 6, spend: 18240, status: "Active", city: "Pune" },
  { id: "CU-02", name: "Sneha Kulkarni", phone: "+91 99700 88112", email: "sneha.k@example.com", orders: 3, spend: 6890, status: "Active", city: "Pimpri-Chinchwad" },
  { id: "CU-03", name: "Zenith Infotech", phone: "+91 20 4004 1122", email: "admin@zenithinfotech.example", orders: 4, spend: 421300, status: "Active", city: "Pune" },
  { id: "CU-04", name: "Aditya Pawar", phone: "+91 90110 55447", email: "aditya.p@example.com", orders: 2, spend: 7998, status: "Inactive", city: "Nashik" },
  { id: "CU-05", name: "Meera Joshi", phone: "+91 88888 22190", email: "meera.j@example.com", orders: 5, spend: 12450, status: "Active", city: "Pune" },
  { id: "CU-06", name: "St. Xavier's School", phone: "+91 20 2712 3344", email: "office@stxaviers.example", orders: 7, spend: 892400, status: "Active", city: "Pimpri-Chinchwad" },
];

export type EnquiryStatus = "New" | "Contacted" | "In Progress" | "Converted" | "Closed";

export type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: string;
  product: string;
  quantity: string;
  message: string;
  date: string;
  status: EnquiryStatus;
};

export const seedEnquiries: Enquiry[] = [
  { id: "EN-1001", name: "Prakash Rane", phone: "+91 98501 22334", email: "prakash@example.com", type: "Product Enquiry", product: "Premium Cabin Trolley", quantity: "1", message: "Is the champagne colour in stock at the shop?", date: "2026-08-24", status: "New" },
  { id: "EN-1002", name: "Nisha Verma", phone: "+91 97300 55221", email: "nisha@example.com", type: "Custom Branding", product: "Custom Logo Backpack", quantity: "80", message: "Need embroidered logo for our NGO volunteers.", date: "2026-08-23", status: "In Progress" },
  { id: "EN-1003", name: "Kunal Bhosale", phone: "+91 90280 77665", email: "kunal@example.com", type: "After-Sales", product: "Hard Shell Suitcase", quantity: "1", message: "Wheel replacement required, purchased last year.", date: "2026-08-22", status: "Contacted" },
  { id: "EN-1004", name: "Radhika Nair", phone: "+91 96500 12345", email: "radhika@example.com", type: "Product Enquiry", product: "Executive Messenger Bag", quantity: "2", message: "Do you offer gift wrapping?", date: "2026-08-20", status: "Converted" },
];

export type BulkEnquiry = {
  id: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  bagType: string;
  quantity: string;
  branding: string;
  deliveryDate: string;
  budget: string;
  status: EnquiryStatus;
};

export const seedBulkEnquiries: BulkEnquiry[] = [
  { id: "BQ-501", company: "Zenith Infotech", contact: "Manoj Kale", phone: "+91 20 4004 1122", email: "hr@zenithinfotech.example", bagType: "Corporate Laptop Bags", quantity: "250", branding: "Embroidered logo", deliveryDate: "2026-09-20", budget: "₹4,00,000 – ₹5,00,000", status: "In Progress" },
  { id: "BQ-502", company: "St. Xavier's School", contact: "Sr. Anita", phone: "+91 20 2712 3344", email: "office@stxaviers.example", bagType: "Institutional School Bags", quantity: "600", branding: "Screen printed crest", deliveryDate: "2026-10-05", budget: "₹5,00,000+", status: "Converted" },
  { id: "BQ-503", company: "Pune Marathon Trust", contact: "Vivek Sathe", phone: "+91 99220 33445", email: "events@punemarathon.example", bagType: "Promotional Backpacks", quantity: "1200", branding: "Sponsor logos, front panel", deliveryDate: "2026-11-12", budget: "₹6,00,000+", status: "New" },
  { id: "BQ-504", company: "Sai Krupa Hospital", contact: "Dr. Rekha Patil", phone: "+91 98811 66554", email: "admin@saikrupa.example", bagType: "Employee Kit Bags", quantity: "90", branding: "Woven label", deliveryDate: "2026-09-02", budget: "₹1,00,000 – ₹2,00,000", status: "Contacted" },
];

export const demoAccount = {
  name: "Rohit Deshmukh",
  email: "rohit.d@example.com",
  phone: "+91 98220 11223",
  address: "Flat 302, Shanti Residency, Aundh Road, Pune, Maharashtra 411020",
  since: "2021",
};

export const demoAccountOrders = [
  { id: "CBH-24801", date: "2026-08-21", items: "Premium Laptop Backpack ×1", amount: 2199, status: "Delivered" as OrderStatus },
  { id: "CBH-24512", date: "2026-06-14", items: "Corporate Laptop Bag ×1", amount: 1899, status: "Delivered" as OrderStatus },
  { id: "CBH-24190", date: "2026-03-02", items: "Large Travel Duffel ×1, Classic School Backpack ×1", amount: 3448, status: "Delivered" as OrderStatus },
];
