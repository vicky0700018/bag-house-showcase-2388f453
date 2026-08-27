export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={i <= Math.round(rating) ? "text-secondary" : "text-border"}
          style={{ fontSize: "0.85em", lineHeight: 1 }}
        >
          ★
        </span>
      ))}
    </span>
  );
}
