// src/components/ui/Card.jsx
export function Card({ children, className = "" }) {
  return (
    <div
      className={
        "card-theme rounded-xl border shadow-sm dark:shadow-none " +
        "transition-colors " + // عشان التغيير بين الثيمات يبقى ناعم
        className
      }
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, actions }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
      <h2 className="text-sm font-semibold">{title}</h2>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function CardBody({ children, className = "" }) {
  return <div className={"px-4 py-3 " + className}>{children}</div>;
}
