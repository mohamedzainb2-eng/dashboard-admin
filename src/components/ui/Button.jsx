import clsx from "clsx";

const base =
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed gap-2";

const variants = {
  primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary",
  secondary:
    "bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary",
  outline:
    "border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-primary",
  ghost:
    "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-primary",
};

const sizes = {
  sm: "h-8 px-3",
  md: "h-9 px-4",
  lg: "h-10 px-5",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className,
  ...props
}) {
  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
