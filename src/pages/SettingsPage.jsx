// src/pages/SettingsPage.jsx
import { useState } from "react";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useSettingsStore } from "../hooks/useSettingsStore";
import { useUIStore } from "../hooks/useUIStore";

const tabs = ["profile", "security", "notifications", "appearance"];

const tabLabels = {
  en: {
    profile: "Profile",
    security: "Security",
    notifications: "Notifications",
    appearance: "Appearance",
  },
  ar: {
    profile: "الملف الشخصي",
    security: "الأمان",
    notifications: "الإشعارات",
    appearance: "المظهر",
  },
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { language, setLanguage, theme, setTheme } = useSettingsStore();
  const showToast = useUIStore((s) => s.showToast);

  const t =
    language === "ar"
      ? {
          title: "الإعدادات",
          subtitle: "إدارة إعدادات الحساب، الأمان، الإشعارات والمظهر.",
          accountSettings: "إعدادات الحساب",
          saveProfile: "حفظ الملف الشخصي",
          updatePassword: "تحديث كلمة المرور",
          saveNotifications: "حفظ الإشعارات",
          languageTitle: "اللغة",
          languageDesc: "يمكنك التبديل بين العربية والإنجليزية.",
          profileSaved: "تم حفظ الملف الشخصي بنجاح",
          passwordUpdated: "تم تحديث كلمة المرور (تمثيلياً 😄)",
          notifSaved: "تم حفظ إعدادات الإشعارات",
          themesTitle: "الثيم",
          themesDesc: "اختر طابع الواجهة المناسب لعلامتك التجارية.",
          themeCorporate: "Corporate",
          themeModern: "Modern",
          themeMinimal: "Minimal",
        }
      : {
          title: "Settings",
          subtitle:
            "Manage your account, security, notifications and appearance.",
          accountSettings: "Account Settings",
          saveProfile: "Save Profile",
          updatePassword: "Update Password",
          saveNotifications: "Save Notifications",
          languageTitle: "Language",
          languageDesc: "You can switch between Arabic and English.",
          profileSaved: "Profile saved successfully",
          passwordUpdated: "Password updated (mock only 😄)",
          notifSaved: "Notification settings saved",
          themesTitle: "Theme",
          themesDesc: "Choose a visual style that matches your brand.",
          themeCorporate: "Corporate",
          themeModern: "Modern",
          themeMinimal: "Minimal",
        };

  const handleProfileSave = () => {
    showToast({ type: "success", message: t.profileSaved });
  };

  const handlePasswordUpdate = () => {
    showToast({ type: "success", message: t.passwordUpdated });
  };

  const handleNotificationsSave = () => {
    showToast({ type: "success", message: t.notifSaved });
  };

  const renderTab = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-3">
            <Input
              label={language === "ar" ? "الاسم" : "Name"}
              defaultValue={language === "ar" ? "مستخدم المدير" : "Admin User"}
            />
            <Input
              label={language === "ar" ? "البريد الإلكتروني" : "Email"}
              defaultValue="admin@example.com"
            />
            <Button onClick={handleProfileSave}>{t.saveProfile}</Button>
          </div>
        );
      case "security":
        return (
          <div className="space-y-3">
            <Input
              label={language === "ar" ? "كلمة المرور الحالية" : "Current Password"}
              type="password"
            />
            <Input
              label={language === "ar" ? "كلمة المرور الجديدة" : "New Password"}
              type="password"
            />
            <Input
              label={
                language === "ar"
                  ? "تأكيد كلمة المرور الجديدة"
                  : "Confirm New Password"
              }
              type="password"
            />
            <Button onClick={handlePasswordUpdate}>
              {t.updatePassword}
            </Button>
          </div>
        );
      case "notifications":
        return (
          <div className="space-y-3 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              <span>
                {language === "ar"
                  ? "أرسل لي بريد إلكتروني عند الطلبات الجديدة"
                  : "Email me about new orders"}
              </span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              <span>
                {language === "ar"
                  ? "نبهني عند فشل عمليات الدفع"
                  : "Notify me about failed payments"}
              </span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span>
                {language === "ar"
                  ? "إرسال ملخص أسبوعي"
                  : "Send weekly summary"}
              </span>
            </label>
            <Button onClick={handleNotificationsSave}>
              {t.saveNotifications}
            </Button>
          </div>
        );
      case "appearance":
        return (
          <div className="space-y-6 text-sm">
            {/* Language */}
            <div>
              <h3 className="text-sm font-semibold mb-2">
                {t.languageTitle}
              </h3>
              <p className="text-slate-500 mb-3">{t.languageDesc}</p>
              <div className="flex gap-2">
                <Button
                  variant={language === "en" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setLanguage("en")}
                >
                  English
                </Button>
                <Button
                  variant={language === "ar" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setLanguage("ar")}
                >
                  العربية
                </Button>
              </div>
            </div>

            {/* Themes */}
            <div>
              <h3 className="text-sm font-semibold mb-2">
                {t.themesTitle}
              </h3>
              <p className="text-slate-500 mb-3">{t.themesDesc}</p>
              <div className="grid gap-3 md:grid-cols-3">
                <button
                  onClick={() => setTheme("corporate")}
                  className={
                    "rounded-xl border p-3 text-left text-xs transition " +
                    (theme === "corporate"
                      ? "border-primary ring-2 ring-primary/40"
                      : "border-slate-200 dark:border-slate-800 hover:border-primary/60")
                  }
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[11px]">
                      {t.themeCorporate}
                    </span>
                    <span className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <div className="flex gap-1">
                    <span className="flex-1 h-6 rounded bg-slate-900" />
                    <span className="flex-1 h-6 rounded bg-slate-700" />
                  </div>
                </button>

                <button
                  onClick={() => setTheme("modern")}
                  className={
                    "rounded-xl border p-3 text-left text-xs transition " +
                    (theme === "modern"
                      ? "border-primary ring-2 ring-primary/40"
                      : "border-slate-200 dark:border-slate-800 hover:border-primary/60")
                  }
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[11px]">
                      {t.themeModern}
                    </span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex gap-1">
                    <span className="flex-1 h-6 rounded bg-slate-900" />
                    <span className="flex-1 h-6 rounded bg-slate-800" />
                  </div>
                </button>

                <button
                  onClick={() => setTheme("minimal")}
                  className={
                    "rounded-xl border p-3 text-left text-xs transition " +
                    (theme === "minimal"
                      ? "border-primary ring-2 ring-primary/40"
                      : "border-slate-200 dark:border-slate-800 hover:border-primary/60")
                  }
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[11px]">
                      {t.themeMinimal}
                    </span>
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                  </div>
                  <div className="flex gap-1">
                    <span className="flex-1 h-6 rounded bg-white border border-slate-200" />
                    <span className="flex-1 h-6 rounded bg-slate-100" />
                  </div>
                </button>
              </div>
            </div>

            {/* Dark mode hint */}
            <div>
              <h3 className="text-sm font-semibold mb-2">
                {language === "ar" ? "الوضع الليلي" : "Dark Mode"}
              </h3>
              <p className="text-slate-500">
                {language === "ar"
                  ? "يمكنك التبديل بين الوضع الفاتح والداكن من الشريط العلوي."
                  : "You can toggle light/dark mode from the top bar."}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">{t.title}</h1>
        <p className="text-sm text-slate-500">{t.subtitle}</p>
      </div>

      <Card>
        <CardHeader
          title={t.accountSettings}
          actions={
            <div className="flex gap-2 flex-wrap">
              {tabs.map((tabKey) => {
                const label =
                  tabLabels[language] && tabLabels[language][tabKey]
                    ? tabLabels[language][tabKey]
                    : tabLabels.en[tabKey];

                return (
                  <button
                    key={tabKey}
                    onClick={() => setActiveTab(tabKey)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      activeTab === tabKey
                        ? "bg-primary text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          }
        />
        <CardBody>{renderTab()}</CardBody>
      </Card>
    </div>
  );
}
