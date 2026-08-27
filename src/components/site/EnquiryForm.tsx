import { useState } from "react";
import { useStore } from "@/lib/store";
import { Modal } from "./Modal";

const types = ["Product Enquiry", "Custom Branding", "Bulk / Corporate", "After-Sales", "General"];

export function EnquiryForm({ product = "", compact = false }: { product?: string; compact?: boolean }) {
  const { submitEnquiry, toast } = useStore();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    type: types[0],
    product,
    quantity: "1",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name";
    if (!/^[0-9+\s-]{10,15}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Enter a valid email";
    if (form.message.trim().length < 5) e.message = "Tell us a little more";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setBusy(true);
    setTimeout(() => {
      submitEnquiry(form);
      setBusy(false);
      setSent(true);
      toast("Enquiry received — our team will call you shortly");
    }, 500);
  };

  if (sent)
    return (
      <div className="fade-up rounded-lg border border-success/40 bg-success/10 p-6 text-center">
        <p className="text-lg font-semibold text-success">Thank you, {form.name.split(" ")[0]}!</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Your enquiry has been logged. A Chandok Bag House representative will contact you on {form.phone} within one
          working day.
        </p>
        <button className="btn-base btn-outline mt-4" onClick={() => setSent(false)}>
          Send another enquiry
        </button>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label className="label-x" htmlFor="eq-name">Name</label>
          <input id="eq-name" className="field" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your full name" />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label className="label-x" htmlFor="eq-phone">Phone</label>
          <input id="eq-phone" className="field" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 90000 00000" />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>
        <div>
          <label className="label-x" htmlFor="eq-email">Email</label>
          <input id="eq-email" className="field" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>
        <div>
          <label className="label-x" htmlFor="eq-type">Enquiry type</label>
          <select id="eq-type" className="field" value={form.type} onChange={(e) => set("type", e.target.value)}>
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-x" htmlFor="eq-product">Product</label>
          <input id="eq-product" className="field" value={form.product} onChange={(e) => set("product", e.target.value)} placeholder="Product of interest" />
        </div>
        <div>
          <label className="label-x" htmlFor="eq-qty">Quantity</label>
          <input id="eq-qty" className="field" value={form.quantity} onChange={(e) => set("quantity", e.target.value)} />
        </div>
      </div>
      <div>
        <label className="label-x" htmlFor="eq-msg">Message</label>
        <textarea id="eq-msg" rows={4} className="field" value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="How can we help?" />
        {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
      </div>
      <button type="submit" className="btn-base btn-gold w-full" disabled={busy}>
        {busy ? "Sending…" : "Submit Enquiry"}
      </button>
    </form>
  );
}

export function EnquiryModal({ open, onClose, product = "" }: { open: boolean; onClose: () => void; product?: string }) {
  return (
    <Modal open={open} onClose={onClose} title="Send an Enquiry" width="max-w-2xl">
      <EnquiryForm product={product} />
    </Modal>
  );
}
