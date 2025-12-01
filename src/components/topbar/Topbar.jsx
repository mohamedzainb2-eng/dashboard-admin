// src\components\topbar\Topbar.jsx
import { Bell, Search, Sun, Moon, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useSettingsStore } from "../../hooks/useSettingsStore";
import { useNotificationsStore } from "../../hooks/useNotificationsStore";

export default function Topbar() {
  const [dark, setDark] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const { language, setLanguage } = useSettingsStore();
  const { notifications, markAsRead, markAllAsRead } =
    useNotificationsStore();

  const unreadCount = notifications.filter((n) => !n.read).length;
  const latest = notifications.slice(0, 4);

  // theme init
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
      return;
    }
    if (stored === "light") {
      setDark(false);
      document.documentElement.classList.remove("dark");
      return;
    }

    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    setDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // sync theme
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const searchPlaceholder =
    language === "ar"
      ? "ابحث... ( / أو Ctrl+K )"
      : "Search... ( / or Ctrl+K )";

  const notifTitle =
    language === "ar" ? "الإشعارات" : "Notifications";

  const emptyText =
    language === "ar"
      ? "لا توجد إشعارات جديدة"
      : "No new notifications";

  const seeAll =
    language === "ar" ? "عرض الكل" : "See all";

  const markAllText =
    language === "ar" ? "تعيين الكل كمقروء" : "Mark all as read";

  const toggleLangLabel = language === "ar" ? "EN" : "ع";

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur z-20">
      {/* Search */}
      <div className="flex items-center gap-2 max-w-md w-full">
        <div className="relative w-full">
          <span className="absolute left-3 top-2.5 text-slate-400">
            <Search size={16} />
          </span>
          <input
            id="global-search"
            type="text"
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Language toggle */}
        <button
          onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
          className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {toggleLangLabel}
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDark((prev) => !prev)}
          className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications + dropdown */}
        <div className="relative">
          <button
            className="relative p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setOpenDropdown((o) => !o)}
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent" />
            )}
          </button>

          {openDropdown && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg text-sm z-30">
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="font-semibold">
                  {notifTitle}
                </span>
                {notifications.length > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] text-primary hover:underline"
                  >
                    {markAllText}
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-auto">
                {latest.length === 0 && (
                  <p className="px-3 py-4 text-slate-500 text-xs">
                    {emptyText}
                  </p>
                )}
                {latest.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`w-full text-left px-3 py-2 border-b border-slate-100 dark:border-slate-800 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800 ${
                      !n.read ? "bg-slate-50/80 dark:bg-slate-900/60" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-xs">
                        {language === "ar" ? n.titleAr : n.title}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {language === "ar" ? n.messageAr : n.message}
                    </p>
                  </button>
                ))}
              </div>
              <div className="px-3 py-2 text-right border-t border-slate-100 dark:border-slate-800">
                <a
                  href="/dashboard/notifications"
                  className="text-xs text-primary hover:underline"
                >
                  {seeAll}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User size={16} className="text-primary" />
          </div>
          <span className="hidden md:block text-sm font-medium">Admin</span>
        </button>
      </div>
    </header>
  );
}
