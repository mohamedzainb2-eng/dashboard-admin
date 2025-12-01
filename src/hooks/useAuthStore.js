// src\hooks\useAuthStore.js
import { create } from "zustand";

const defaultState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

function loadInitialAuthState() {
  if (typeof window === "undefined") return defaultState;

  try {
    const raw = localStorage.getItem("auth");
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.isAuthenticated && parsed.user) {
      return {
        isAuthenticated: true,
        user: parsed.user,
        error: null,
      };
    }
    return defaultState;
  } catch {
    return defaultState;
  }
}

export const useAuthStore = create((set) => ({
  ...loadInitialAuthState(),

  login: ({ email, password }) => {
    if (email === "admin@example.com" && password === "admin123") {
      const user = { name: "Admin User", email };
      set({
        isAuthenticated: true,
        user,
        error: null,
      });
      return true;
    } else {
      set({ error: "Invalid credentials" });
      return false;
    }
  },

  logout: () =>
    set({
      isAuthenticated: false,
      user: null,
      error: null,
    }),

  clearError: () => set({ error: null }),
}));

// ✅ أي تغيير في الأوث بيتخزن في localStorage
if (typeof window !== "undefined") {
  useAuthStore.subscribe((state) => {
    const toStore = {
      isAuthenticated: state.isAuthenticated,
      user: state.user,
    };
    localStorage.setItem("auth", JSON.stringify(toStore));
  });
}
