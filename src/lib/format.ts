export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

export const discountPct = (price: number, mrp: number) =>
  mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
