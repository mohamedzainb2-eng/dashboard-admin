export default function Badge({ children, color = "gray" }) {
  const colors = {
    gray: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
    green:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    red: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    yellow:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
        colors[color] || colors.gray
      }`}
    >
      {children}
    </span>
  );
}
