import type { ReactNode } from "react";

export function Modal({
  open,
  onClose,
  title,
  children,
  width = "max-w-lg",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-ink/60 p-4 py-10">
      <div className={`surface fade-up w-full ${width}`}>
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="text-lg font-semibold text-primary">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="btn-base btn-ghost px-2 py-1 text-lg">
            ✕
          </button>
        </div>
        <div className="px-5 py-5">{children}</div>
      </div>
    </div>
  );
}

export function ConfirmDialog({
  open,
  message,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal open={open} onClose={onCancel} title="Please confirm" width="max-w-sm">
      <p className="text-sm text-muted-foreground">{message}</p>
      <div className="mt-5 flex justify-end gap-2">
        <button className="btn-base btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn-base btn-primary" onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </Modal>
  );
}
