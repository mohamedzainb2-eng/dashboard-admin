export function Table({ children }) {
  return (
    <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
      <table className="min-w-full text-sm">{children}</table>
    </div>
  );
}

export function THead({ children }) {
  return <thead className="bg-slate-50 dark:bg-slate-900">{children}</thead>;
}

export function TBody({ children }) {
  return (
    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
      {children}
    </tbody>
  );
}

export function TH({ children, className = "" }) {
  return (
    <th
      className={`text-left font-semibold text-xs text-slate-500 uppercase tracking-wide px-4 py-2 ${className}`}
    >
      {children}
    </th>
  );
}

export function TR({ children, className = "", onClick }) {
  return (
    <tr
      onClick={onClick}
      className={`hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer ${className}`}
    >
      {children}
    </tr>
  );
}

export function TD({ children, className = "" }) {
  return (
    <td
      className={`px-4 py-2 text-sm text-slate-700 dark:text-slate-200 ${className}`}
    >
      {children}
    </td>
  );
}
