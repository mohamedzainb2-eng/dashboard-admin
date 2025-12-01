// src/hooks/useSettingsStore.js
import { create } from "zustand";

function getInitialLanguage() {
  if (typeof window === "undefined") return "en";

  const stored = localStorage.getItem("language");
  if (stored === "ar" || stored === "en") return stored;

  const navLang = navigator.language || navigator.userLanguage;
  if (navLang && navLang.toLowerCase().startsWith("ar")) return "ar";
  return "en";
}

function getInitialTheme() {
  if (typeof window === "undefined") return "modern";

  // 🔹 استخدم مفتاح مختلف عن theme بتاع الـDark/Light
  const stored = localStorage.getItem("appTheme");
  if (stored === "corporate" || stored === "modern" || stored === "minimal") {
    return stored;
  }
  return "modern";
}

const initialLanguage = getInitialLanguage();
const initialTheme = getInitialTheme();

export const useSettingsStore = create((set) => ({
  language: initialLanguage,
  theme: initialTheme,

  setLanguage: (language) => set({ language }),
  setTheme: (theme) => set({ theme }),
}));

// تطبيق اللغة + الثيم على <html> + حفظهم
if (typeof window !== "undefined") {
  const apply = (state) => {
    document.documentElement.dir = state.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.theme = state.theme;
    localStorage.setItem("language", state.language);
    localStorage.setItem("appTheme", state.theme);
  };

  apply({ language: initialLanguage, theme: initialTheme });

  useSettingsStore.subscribe(apply);
}
