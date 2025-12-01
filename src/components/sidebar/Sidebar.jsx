// src\components\sidebar\Sidebar.jsx
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  Users,
  ShoppingBag,
  Settings,
  LogOut,
  Package,
  Bell,
} from "lucide-react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useSettingsStore } from "../../hooks/useSettingsStore";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { key: "analytics", to: "/dashboard/analytics", icon: LayoutDashboard },
  { key: "users", to: "/dashboard/users", icon: Users },
  { key: "orders", to: "/dashboard/orders", icon: ShoppingBag },
  { key: "products", to: "/dashboard/products", icon: Package },
  { key: "notifications", to: "/dashboard/notifications", icon: Bell },
  { key: "settings", to: "/dashboard/settings", icon: Settings },
];

const navLabels = {
  en: {
    analytics: "Analytics",
    users: "Users",
    orders: "Orders",
    products: "Products",
    notifications: "Notifications",
    settings: "Settings",
  },
  ar: {
    analytics: "التحليلات",
    users: "المستخدمون",
    orders: "الطلبات",
    products: "المنتجات",
    notifications: "الإشعارات",
    settings: "الإعدادات",
  },
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("sidebarCollapsed");
    return stored === "true";
  });

  const [openMobile, setOpenMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("sidebarCollapsed", collapsed ? "true" : "false");
  }, [collapsed]);

  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const language = useSettingsStore((s) => s.language);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const appName = language === "ar" ? "لوحة التحكم" : "AdminPanel";

  const baseClasses =
    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors";

  const renderNav = (isMobile = false) =>
    navItems.map((item) => {
      const Icon = item.icon;
      const label =
        navLabels[language] && navLabels[language][item.key]
          ? navLabels[language][item.key]
          : navLabels.en[item.key];

      return (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={isMobile ? () => setOpenMobile(false) : undefined}
          className={({ isActive }) =>
            [
              baseClasses,
              isActive
                ? "bg-primary text-white"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
            ].join(" ")
          }
        >
          <Icon size={18} />
          {!collapsed && !isMobile && <span>{label}</span>}
          {isMobile && <span>{label}</span>}
        </NavLink>
      );
    });

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="md:hidden fixed top-3 left-3 z-40 bg-primary text-white p-2 rounded-lg"
        onClick={() => setOpenMobile(!openMobile)}
      >
        <Menu size={18} />
      </button>

      {/* Desktop Sidebar */}
      <motion.aside
        className="
          hidden md:flex flex-col
          border-r border-slate-200 dark:border-slate-800
          bg-white dark:bg-slate-900
        "
        animate={{ width: collapsed ? 64 : 256 }}
        initial={{ width: 256 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          {!collapsed && (
            <span className="font-bold text-primary tracking-tight">
              {appName}
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="px-2 space-y-1 flex-1">{renderNav(false)}</nav>

        {/* Footer + Logout */}
        {!collapsed && (
          <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>© {new Date().getFullYear()} AdminPanel</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-red-500"
            >
              <LogOut size={12} />
              {language === "ar" ? "تسجيل خروج" : "Logout"}
            </button>
          </div>
        )}
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {openMobile && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setOpenMobile(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.aside
              className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 p-4 flex flex-col"
              onClick={(e) => e.stopPropagation()}
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-primary">{appName}</span>
                <button
                  onClick={() => setOpenMobile(false)}
                  className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Menu size={18} />
                </button>
              </div>

              <nav className="space-y-1 flex-1 overflow-y-auto">
                {renderNav(true)}
              </nav>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>© {new Date().getFullYear()} AdminPanel</span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-red-500"
                >
                  <LogOut size={12} />
                  {language === "ar" ? "تسجيل خروج" : "Logout"}
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
