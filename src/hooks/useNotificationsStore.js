// src\hooks\useNotificationsStore.js
import { create } from "zustand";
import { notificationsMock } from "../data/notifications";

export const useNotificationsStore = create((set) => ({
  notifications: notificationsMock,

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
}));
