// src\layouts\DashboardLayout.jsx
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import ToastContainer from "../components/ui/ToastContainer";

export default function DashboardLayout() {
  // Keyboard Shortcuts: / و Ctrl+K يفتحوا الـSearch
  useEffect(() => {
    const handler = (e) => {
      // / → Focus على search
      if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const input = document.getElementById("global-search");
        if (input) input.focus();
      }

      // Ctrl+K → برضه Focus على search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const input = document.getElementById("global-search");
        if (input) input.focus();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
