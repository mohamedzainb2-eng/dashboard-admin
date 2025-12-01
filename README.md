# Admin Dashboard – React + Vite

A modern, production-style admin dashboard built with **React**, **Vite**, **Tailwind CSS**, and **Zustand**.  
Includes analytics, users management, orders, products, settings, notifications, themes, and full responsive support.

> This is a front-end only project (no real backend). All data is mocked using JSON and state stores.

---

## ✨ Features

- **Authentication (mock)**  
  Simple login flow to access `/dashboard/*`.

- **Dashboard Layout**
  - Responsive sidebar (collapse, mobile drawer)
  - Topbar with search, notifications, dark mode, language toggle, user avatar
  - Protected routes using React Router

- **Pages**
  - `Analytics`
    - KPI cards (Users, Sales, Orders, Bounce rate)
    - Charts (Line, Bar, Pie) using Recharts
    - Recent activity + top countries
  - `Users`
    - Table + mobile card view
    - Search, filter by role/status
    - Pagination
    - Add / Edit / Delete (stored in Zustand)
    - Export to CSV
  - `Orders`
    - Table + mobile cards
    - Sort by date / amount / status
    - Search, filter by status
    - Order details page
    - Export to CSV
  - `Products`
    - Grid view + table view
    - Filters (category, stock)
    - Basic product stats (count, in-stock, average price)
  - `Settings`
    - Profile, Security, Notifications, Appearance
    - Language selection (EN / AR)
    - Theme selection (Corporate / Modern / Minimal)
  - `Notifications`
    - List, filter, mark as read, mark all as read

- **UI / UX**
  - Design system style components (Buttons, Cards, Inputs, Modals, Table, Badge, Tabs, Toasts, etc.)
  - Toast notifications for key actions
  - Keyboard shortcuts (can be extended)
  - Dark mode toggle (stored in `localStorage`)
  - Smooth sidebar and mobile animations using Framer Motion

- **Internationalization**
  - English + Arabic texts for main pages and labels
  - `dir="rtl"` applied automatically when Arabic is active

- **Themes**
  - Corporate (blue, more “enterprise”)
  - Modern (clean gray)
  - Minimal (white / light, simple)
  - Theme selection stored and applied globally via `data-theme` on `<html>`

---

## 🛠 Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Charts:** Recharts

---

## 📂 Project Structure

Main folders:

```txt
src/
  assets/         # Static assets if needed
  components/     # Reusable UI components (buttons, cards, table, sidebar, topbar...)
    ui/           # Design system components
    sidebar/
    topbar/
  layouts/        # Dashboard layout
  pages/          # Pages: Analytics, Users, Orders, Products, Settings, Notifications, Auth
  hooks/          # Zustand stores and custom hooks
  data/           # Mock data (users, orders, products, activity, notifications)
  styles/         # Extra styles if needed
  main.jsx        # App entry, Router + Providers
