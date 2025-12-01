import { create } from "zustand";
import { ordersMock } from "../data/orders";

export const useOrdersStore = create((set) => ({
  orders: ordersMock,
  sortBy: "date",
  sortDir: "desc",

  setSort: (field) =>
    set((state) => ({
      sortBy: field,
      sortDir:
        state.sortBy === field && state.sortDir === "asc" ? "desc" : "asc",
    })),
}));
