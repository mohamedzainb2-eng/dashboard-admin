// src/hooks/useUsersStore.js
import { create } from "zustand";
import { usersMock } from "../data/users";

export const useUsersStore = create((set) => ({
  users: usersMock,
  search: "",
  roleFilter: "All",
  statusFilter: "All",

  setSearch: (search) => set({ search }),
  setRoleFilter: (roleFilter) => set({ roleFilter }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),

  addUser: (user) =>
    set((state) => {
      const maxId = state.users.reduce(
        (max, u) => (u.id > max ? u.id : max),
        0
      );
      const newUser = {
        id: maxId + 1,
        createdAt: new Date().toISOString().slice(0, 10),
        ...user,
      };
      return { users: [...state.users, newUser] };
    }),

  editUser: (id, updates) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === id ? { ...u, ...updates } : u
      ),
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),
}));
