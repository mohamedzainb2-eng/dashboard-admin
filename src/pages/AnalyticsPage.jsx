// src\pages\AnalyticsPage.jsx
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { activityMock } from "../data/activity";
import { useSettingsStore } from "../hooks/useSettingsStore";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const kpis = [
  { labelKey: "users", value: "2,431", change: "+18%", positive: true },
  { labelKey: "sales", value: "$48,920", change: "+12%", positive: true },
  { labelKey: "orders", value: "312", change: "+5%", positive: true },
  { labelKey: "bounce", value: "31%", change: "-4%", positive: true },
];

const kpiLabels = {
  en: {
    users: "Users today",
    sales: "Sales",
    orders: "Orders",
    bounce: "Bounce rate",
  },
  ar: {
    users: "المستخدمون اليوم",
    sales: "المبيعات",
    orders: "الطلبات",
    bounce: "معدل الارتداد",
  },
};

const trafficData = [
  { name: "Mon", visits: 1200, sales: 420 },
  { name: "Tue", visits: 1800, sales: 610 },
  { name: "Wed", visits: 1500, sales: 530 },
  { name: "Thu", visits: 2100, sales: 780 },
  { name: "Fri", visits: 2600, sales: 950 },
  { name: "Sat", visits: 1900, sales: 700 },
  { name: "Sun", visits: 1300, sales: 480 },
];

const revenueData = [
  { name: "Q1", revenue: 18000 },
  { name: "Q2", revenue: 22000 },
  { name: "Q3", revenue: 27500 },
  { name: "Q4", revenue: 32000 },
];

const deviceData = [
  { name: "Desktop", value: 55 },
  { name: "Mobile", value: 35 },
  { name: "Tablet", value: 10 },
];

const countryStats = [
  { country: "Egypt", users: 820 },
  { country: "KSA", users: 610 },
  { country: "UAE", users: 450 },
  { country: "Morocco", users: 290 },
];

const pieColors = ["#4F46E5", "#0EA5E9", "#F97316"];

export default function AnalyticsPage() {
  const [ready, setReady] = useState(false);
  const language = useSettingsStore((s) => s.language);

  useEffect(() => {
    setReady(true);
  }, []);

  const t =
    language === "ar"
      ? {
          title: "لوحة التحليلات",
          subtitle: "نظرة سريعة على أداء التطبيق والمبيعات والمستخدمين.",
          trafficTitle: "الزيارات والمبيعات",
          revenueTitle: "الإيرادات حسب الربع",
          devicesTitle: "الأجهزة",
          countriesTitle: "أعلى الدول",
          recentActivity: "النشاط الأخير",
          usersLabel: "مستخدم",
        }
      : {
          title: "Dashboard Analytics",
          subtitle: "Quick overview of app performance, sales and users.",
          trafficTitle: "Traffic & Sales",
          revenueTitle: "Revenue by Quarter",
          devicesTitle: "Devices",
          countriesTitle: "Top Countries",
          recentActivity: "Recent Activity",
          usersLabel: "users",
        };

  if (!ready) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">{t.title}</h1>
        <p className="text-sm text-slate-500">{t.subtitle}</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.labelKey}>
            <CardBody>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase text-slate-500">
                    {kpiLabels[language]?.[kpi.labelKey] ||
                      kpiLabels.en[kpi.labelKey]}
                  </p>
                  <p className="mt-1 text-2xl font-semibold">{kpi.value}</p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {language === "ar"
                      ? "مقارنة بالأسبوع الماضي"
                      : "Compared to last week"}
                  </p>
                </div>
                <Badge color={kpi.positive ? "green" : "red"}>
                  {kpi.change}
                </Badge>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title={t.trafficTitle} />
          <CardBody className="overflow-x-auto">
            <div className="min-w-[520px]">
              <LineChart width={600} height={260} data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="#4F46E5"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#F97316"
                  strokeWidth={2}
                />
              </LineChart>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title={t.revenueTitle} />
          <CardBody className="overflow-x-auto">
            <div className="min-w-[400px]">
              <BarChart width={420} height={260} data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#0EA5E9" />
              </BarChart>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Devices Pie */}
        <Card>
          <CardHeader title={t.devicesTitle} />
          <CardBody className="flex justify-center">
            <PieChart width={260} height={260}>
              <Pie
                data={deviceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {deviceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </CardBody>
        </Card>

        {/* Countries */}
        <Card className="lg:col-span-2">
          <CardHeader title={t.countriesTitle} />
          <CardBody>
            <div className="space-y-2 text-sm">
              {countryStats.map((c) => (
                <div
                  key={c.country}
                  className="flex items-center justify-between"
                >
                  <span>{c.country}</span>
                  <span className="font-medium">
                    {c.users} {t.usersLabel}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader title={t.recentActivity} />
        <CardBody>
          <ul className="space-y-3 text-sm">
            {activityMock.map((a) => (
              <li
                key={a.id}
                className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 last:border-b-0 last:pb-0"
              >
                <span>{a.message}</span>
                <span className="text-xs text-slate-500">{a.time}</span>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
