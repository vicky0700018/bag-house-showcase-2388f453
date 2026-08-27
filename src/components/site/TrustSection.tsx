import { trustPoints } from "@/data/site";

export function TrustSection() {
  return (
    <section className="container-page py-14">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {trustPoints.map((t) => (
          <div key={t.title} className="surface card-hover p-5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-bold text-accent">
              {t.icon}
            </span>
            <h3 className="mt-4 text-base font-semibold text-primary">{t.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
