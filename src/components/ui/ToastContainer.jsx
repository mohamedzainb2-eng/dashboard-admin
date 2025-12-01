import { useEffect } from "react";
import { useUIStore } from "../../hooks/useUIStore";

export default function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  useEffect(() => {
    if (!toasts.length) return;
    const timers = toasts.map((t) =>
      setTimeout(() => removeToast(t.id), 3000)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, removeToast]);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-slate-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
