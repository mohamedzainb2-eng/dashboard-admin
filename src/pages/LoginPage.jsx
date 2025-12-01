import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, error, clearError } = useAuthStore();

  const [form, setForm] = useState({
    email: "admin@example.com",
    password: "admin123",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    clearError();
    const ok = login(form);
    if (ok) {
      navigate("/dashboard/analytics", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-6 space-y-4">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-semibold">Welcome back</h1>
          <p className="text-sm text-slate-500">
            Demo credentials:
            <br />
            <code className="text-xs">
              admin@example.com / admin123
            </code>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm((f) => ({ ...f, email: e.target.value }))
            }
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
          />

          {error && (
            <p className="text-xs text-red-500">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
