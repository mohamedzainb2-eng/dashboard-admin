import { useMemo, useState } from "react";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { useNotificationsStore } from "../hooks/useNotificationsStore";
import { useSettingsStore } from "../hooks/useSettingsStore";

export default function NotificationsPage() {
  const notifications = useNotificationsStore((s) => s.notifications || []);
  const markAllRead =
    useNotificationsStore((s) => s.markAllRead) || (() => {});
  const clearAll =
    useNotificationsStore((s) => s.clearAll) || (() => {});

  const language = useSettingsStore((s) => s.language);
  const [filter, setFilter] = useState("all");

  const isArabic = language === "ar";

  const t = isArabic
    ? {
        title: "الإشعارات",
        subtitle: "عرض وإدارة جميع الإشعارات في النظام.",
        all: "الكل",
        unread: "غير المقروءة",
        read: "المقروءة",
        markAllRead: "تعيين الكل كمقروء",
        clearAll: "مسح الكل",
        empty: "لا توجد إشعارات حالياً.",
        typeOrder: "طلب",
        typeUser: "مستخدم",
        typeSystem: "نظام",
      }
    : {
        title: "Notifications",
        subtitle: "View and manage all system notifications.",
        all: "All",
        unread: "Unread",
        read: "Read",
        markAllRead: "Mark all as read",
        clearAll: "Clear all",
        empty: "No notifications at the moment.",
        typeOrder: "Order",
        typeUser: "User",
        typeSystem: "System",
      };

  const filtered = useMemo(() => {
    if (filter === "unread") {
      return notifications.filter((n) => !n.read);
    }
    if (filter === "read") {
      return notifications.filter((n) => n.read);
    }
    return notifications;
  }, [notifications, filter]);

  const typeLabel = (type) => {
    if (type === "order") return t.typeOrder;
    if (type === "user") return t.typeUser;
    return t.typeSystem;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold">{t.title}</h1>
          <p className="text-sm text-slate-500">{t.subtitle}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            size="sm"
            variant={filter === "all" ? "primary" : "outline"}
            onClick={() => setFilter("all")}
          >
            {t.all}
          </Button>
          <Button
            size="sm"
            variant={filter === "unread" ? "primary" : "outline"}
            onClick={() => setFilter("unread")}
          >
            {t.unread}
          </Button>
          <Button
            size="sm"
            variant={filter === "read" ? "primary" : "outline"}
            onClick={() => setFilter("read")}
          >
            {t.read}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader
          title={t.title}
          actions={
            notifications.length > 0 && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => markAllRead()}
                >
                  {t.markAllRead}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => clearAll()}
                >
                  {t.clearAll}
                </Button>
              </div>
            )
          }
        />
        <CardBody className="space-y-2">
          {filtered.length === 0 && (
            <p className="text-sm text-slate-500">{t.empty}</p>
          )}

          <div className="space-y-2">
            {filtered.map((n) => (
              <div
                key={n.id}
                className={
                  "rounded-lg border px-3 py-2 text-sm flex items-start justify-between gap-3 " +
                  (n.read
                    ? "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800"
                    : "bg-primary/5 border-primary/40")
                }
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{n.title}</span>
                    <Badge color={n.read ? "gray" : "blue"}>
                      {typeLabel(n.type)}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {n.message}
                  </p>
                  <p className="text-[11px] text-slate-400">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
