// src\pages\NotificationsPage.jsx
import { useState } from "react";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { useNotificationsStore } from "../hooks/useNotificationsStore";
import { useSettingsStore } from "../hooks/useSettingsStore";
import { useUIStore } from "../hooks/useUIStore";

const filters = ["all", "unread", "orders", "system"];

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead } =
    useNotificationsStore();
  const language = useSettingsStore((s) => s.language);
  const showToast = useUIStore((s) => s.showToast);

  const [activeFilter, setActiveFilter] = useState("all");

  const t =
    language === "ar"
      ? {
          title: "الإشعارات",
          subtitle: "عرض وإدارة جميع إشعارات النظام والطلبات والمستخدمين.",
          markAll: "تعيين الكل كمقروء",
          noNotif: "لا توجد إشعارات مطابقة.",
          markAllToast: "تم تعيين جميع الإشعارات كمقروءة",
        }
      : {
          title: "Notifications",
          subtitle: "View and manage all system, order and user alerts.",
          markAll: "Mark all as read",
          noNotif: "No matching notifications.",
          markAllToast: "All notifications marked as read",
        };

  const filterLabel = (key) => {
    if (language === "ar") {
      if (key === "all") return "الكل";
      if (key === "unread") return "غير مقروءة";
      if (key === "orders") return "الطلبات";
      if (key === "system") return "النظام";
    } else {
      if (key === "all") return "All";
      if (key === "unread") return "Unread";
      if (key === "orders") return "Orders";
      if (key === "system") return "System";
    }
    return key;
  };

  const filtered = notifications.filter((n) => {
    if (activeFilter === "unread") return !n.read;
    if (activeFilter === "orders") return n.type === "order" || n.type === "payment";
    if (activeFilter === "system") return n.type === "system" || n.type === "user";
    return true;
  });

  const handleMarkAll = () => {
    markAllAsRead();
    showToast({ type: "success", message: t.markAllToast });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold">{t.title}</h1>
          <p className="text-sm text-slate-500">{t.subtitle}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkAll}
        >
          {t.markAll}
        </Button>
      </div>

      <Card>
        <CardHeader
          title={language === "ar" ? "تصفية الإشعارات" : "Filter notifications"}
          actions={
            <div className="flex gap-2 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    activeFilter === f
                      ? "bg-primary text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                  }`}
                >
                  {filterLabel(f)}
                </button>
              ))}
            </div>
          }
        />
        <CardBody>
          {filtered.length === 0 ? (
            <p className="text-sm text-slate-500">{t.noNotif}</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {filtered.map((n) => (
                <li
                  key={n.id}
                  className="flex items-start justify-between border border-slate-100 dark:border-slate-800 rounded-lg px-3 py-2 bg-white dark:bg-slate-900"
                >
                  <div>
                    <p className="font-semibold">
                      {language === "ar" ? n.titleAr : n.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {language === "ar" ? n.messageAr : n.message}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {n.time}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge color={n.read ? "gray" : "blue"}>
                      {language === "ar"
                        ? n.read
                          ? "مقروء"
                          : "غير مقروء"
                        : n.read
                        ? "Read"
                        : "Unread"}
                    </Badge>
                    {!n.read && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        className="text-[11px] text-primary hover:underline"
                      >
                        {language === "ar" ? "تعيين كمقروء" : "Mark as read"}
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
