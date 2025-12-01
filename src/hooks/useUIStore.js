// src/hooks/useUIStore.js
import { create } from "zustand";

export const useUIStore = create((set) => ({
  toasts: [],
  showToast: ({ type = "info", message }) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { id: Date.now() + Math.random(), type, message },
      ],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
