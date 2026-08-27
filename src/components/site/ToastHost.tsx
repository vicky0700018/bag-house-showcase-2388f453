import { useStore } from "@/lib/store";

export function ToastHost() {
  const { toasts, dismissToast } = useStore();
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-2">
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => dismissToast(t.id)}
          className="pointer-events-auto fade-up surface flex items-start gap-3 px-4 py-3 text-left text-sm"
        >
          <span
            className={`mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full ${
              t.tone === "error" ? "bg-destructive" : t.tone === "info" ? "bg-secondary" : "bg-success"
            }`}
          />
          <span className="text-foreground">{t.message}</span>
        </button>
      ))}
    </div>
  );
}
