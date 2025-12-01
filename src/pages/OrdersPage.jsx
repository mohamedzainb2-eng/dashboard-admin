// src/pages/OrdersPage.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Table, THead, TBody, TH, TR, TD } from "../components/ui/Table";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Input from "../components/ui/Input";
import { useOrdersStore } from "../hooks/useOrdersStore";
import { useSettingsStore } from "../hooks/useSettingsStore";
import { useUIStore } from "../hooks/useUIStore";

const PAGE_SIZE = 5;

export default function OrdersPage() {
  const { orders, sortBy, sortDir, setSort } = useOrdersStore();
  const language = useSettingsStore((s) => s.language);
  const showToast = useUIStore((s) => s.showToast);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const isArabic = language === "ar";

  const t = isArabic
    ? {
        title: "الطلبات",
        subtitle: "عرض وإدارة طلبات العملاء وحالات الدفع والشحن.",
        searchLabel: "بحث",
        statusLabel: "الحالة",
        all: "الكل",
        paid: "مدفوع",
        pending: "قيد الانتظار",
        cancelled: "ملغى",
        id: "رقم الطلب",
        customer: "العميل",
        amount: "المبلغ",
        status: "الحالة",
        date: "التاريخ",
        actions: "الإجراءات",
        view: "عرض التفاصيل",
        exportCSV: "تصدير CSV",
        totalOrders: "إجمالي الطلبات",
        totalRevenue: "إجمالي المبيعات",
        paidOrders: "الطلبات المدفوعة",
        pageLabel: "صفحة",
        of: "من",
        csvToast: "تم تصدير الطلبات إلى CSV",
      }
    : {
        title: "Orders",
        subtitle: "View and manage customer orders and payment/shipping status.",
        searchLabel: "Search",
        statusLabel: "Status",
        all: "All",
        paid: "Paid",
        pending: "Pending",
        cancelled: "Cancelled",
        id: "Order ID",
        customer: "Customer",
        amount: "Amount",
        status: "Status",
        date: "Date",
        actions: "Actions",
        view: "View details",
        exportCSV: "Export CSV",
        totalOrders: "Total orders",
        totalRevenue: "Total revenue",
        paidOrders: "Paid orders",
        pageLabel: "Page",
        of: "of",
        csvToast: "Orders exported to CSV",
      };

  const statusColor = (status) => {
    if (status === "Paid") return "green";
    if (status === "Pending") return "yellow";
    if (status === "Cancelled") return "red";
    return "gray";
  };

  const sortedAndFiltered = useMemo(() => {
    let list = [...orders];

    // sort
    list.sort((a, b) => {
      let va, vb;
      if (sortBy === "amount") {
        va = a.amount;
        vb = b.amount;
      } else if (sortBy === "status") {
        const order = { Paid: 1, Pending: 2, Cancelled: 3 };
        va = order[a.status] || 99;
        vb = order[b.status] || 99;
      } else {
        // date as default
        va = new Date(a.date).getTime();
        vb = new Date(b.date).getTime();
      }
      if (va < vb) return -1;
      if (va > vb) return 1;
      return 0;
    });

    if (sortDir === "desc") list.reverse();

    // search + filter
    return list.filter((o) => {
      const matchesSearch =
        !search ||
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || o.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, sortBy, sortDir, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(sortedAndFiltered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginated = sortedAndFiltered.slice(start, start + PAGE_SIZE);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
  const paidOrders = orders.filter((o) => o.status === "Paid").length;

  const handleExportCSV = () => {
    const header = ["id", "customer", "amount", "status", "date"];
    const rows = sortedAndFiltered.map((o) => [
      o.id,
      o.customer,
      o.amount,
      o.status,
      o.date,
    ]);

    const lines = [header.join(","), ...rows.map((r) => r.join(","))];
    const blob = new Blob([lines.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "orders.csv";
    link.click();
    URL.revokeObjectURL(url);

    showToast({ type: "success", message: t.csvToast });
  };

  const goToDetails = (id) => {
    navigate(`/dashboard/orders/${id}`);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold">{t.title}</h1>
          <p className="text-sm text-slate-500">{t.subtitle}</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleExportCSV}>
          {t.exportCSV}
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-3 md:grid-cols-3">
        <Card>
          <CardBody>
            <p className="text-xs text-slate-500 uppercase">
              {t.totalOrders}
            </p>
            <p className="text-2xl font-semibold mt-1">{totalOrders}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-xs text-slate-500 uppercase">
              {t.totalRevenue}
            </p>
            <p className="text-2xl font-semibold mt-1">
              ${totalRevenue.toLocaleString()}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-xs text-slate-500 uppercase">
              {t.paidOrders}
            </p>
            <p className="text-2xl font-semibold mt-1">{paidOrders}</p>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardBody className="grid gap-3 md:grid-cols-2">
          <Input
            label={t.searchLabel}
            placeholder={
              isArabic ? "بحث برقم الطلب أو اسم العميل..." : "Search by ID or customer..."
            }
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              {t.statusLabel}
            </label>
            <select
              className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="All">{t.all}</option>
              <option value="Paid">{t.paid}</option>
              <option value="Pending">{t.pending}</option>
              <option value="Cancelled">{t.cancelled}</option>
            </select>
          </div>
        </CardBody>
      </Card>

      {/* Desktop Table */}
      <Card className="hidden md:block">
        <CardBody className="space-y-3">
          <Table>
            <THead>
              <tr>
                <TH
                  className="cursor-pointer"
                  onClick={() => setSort("id")}
                >
                  {t.id}
                </TH>
                <TH>{t.customer}</TH>
                <TH
                  className="cursor-pointer"
                  onClick={() => setSort("amount")}
                >
                  {t.amount}
                </TH>
                <TH
                  className="cursor-pointer"
                  onClick={() => setSort("status")}
                >
                  {t.status}
                </TH>
                <TH
                  className="cursor-pointer"
                  onClick={() => setSort("date")}
                >
                  {t.date}
                </TH>
                <TH>{t.actions}</TH>
              </tr>
            </THead>
            <TBody>
              {paginated.map((o) => (
                <TR
                  key={o.id}
                  onClick={() => goToDetails(o.id)}
                >
                  <TD>{o.id}</TD>
                  <TD>{o.customer}</TD>
                  <TD>${o.amount.toFixed(2)}</TD>
                  <TD>
                    <Badge color={statusColor(o.status)}>{o.status}</Badge>
                  </TD>
                  <TD>{o.date}</TD>
                  <TD>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToDetails(o.id);
                      }}
                    >
                      {t.view}
                    </Button>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              {t.pageLabel} {currentPage} {t.of} {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                {isArabic ? "السابق" : "Prev"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                {isArabic ? "التالي" : "Next"}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Mobile Cards */}
      <Card className="md:hidden">
        <CardBody className="space-y-3">
          {paginated.map((o) => (
            <div
              key={o.id}
              className="border border-slate-200 dark:border-slate-800 rounded-lg p-3 space-y-1"
              onClick={() => goToDetails(o.id)}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">{o.id}</span>
                <Badge color={statusColor(o.status)}>{o.status}</Badge>
              </div>
              <p className="text-xs text-slate-500">
                {t.customer}: {o.customer}
              </p>
              <p className="text-xs text-slate-500">
                {t.amount}: ${o.amount.toFixed(2)}
              </p>
              <p className="text-[11px] text-slate-400">
                {t.date}: {o.date}
              </p>
              <div className="flex justify-end pt-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToDetails(o.id);
                  }}
                >
                  {t.view}
                </Button>
              </div>
            </div>
          ))}

          {/* Pagination للموبايل */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
            <span>
              {t.pageLabel} {currentPage} {t.of} {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                {isArabic ? "السابق" : "Prev"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                {isArabic ? "التالي" : "Next"}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
