// src/pages/ProductsPage.jsx
import { useMemo, useState } from "react";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Table, THead, TBody, TH, TR, TD } from "../components/ui/Table";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Input from "../components/ui/Input";
import { productsMock } from "../data/products";
import { useSettingsStore } from "../hooks/useSettingsStore";

const PAGE_SIZE = 6;

export default function ProductsPage() {
  const language = useSettingsStore((s) => s.language);
  const [view, setView] = useState("grid"); // grid | table
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [page, setPage] = useState(1);

  const isArabic = language === "ar";

  const t = isArabic
    ? {
        title: "المنتجات",
        subtitle: "إدارة الكتالوج، الأسعار، والتوفر.",
        searchLabel: "بحث",
        categoryLabel: "الفئة",
        stockLabel: "التوفر",
        all: "الكل",
        inStock: "متوفر",
        outOfStock: "غير متوفر",
        name: "الاسم",
        sku: "الرمز (SKU)",
        category: "الفئة",
        price: "السعر",
        availability: "التوفر",
        rating: "التقييم",
        gridView: "شبكة",
        tableView: "جدول",
        totalProducts: "إجمالي المنتجات",
        inStockCount: "منتجات متوفرة",
        avgPrice: "متوسط السعر",
        pageLabel: "صفحة",
        of: "من",
      }
    : {
        title: "Products",
        subtitle: "Manage catalog, pricing and availability.",
        searchLabel: "Search",
        categoryLabel: "Category",
        stockLabel: "Availability",
        all: "All",
        inStock: "In stock",
        outOfStock: "Out of stock",
        name: "Name",
        sku: "SKU",
        category: "Category",
        price: "Price",
        availability: "Availability",
        rating: "Rating",
        gridView: "Grid",
        tableView: "Table",
        totalProducts: "Total products",
        inStockCount: "In stock",
        avgPrice: "Average price",
        pageLabel: "Page",
        of: "of",
      };

  const categories = [
    "All",
    ...Array.from(new Set(productsMock.map((p) => p.category))),
  ];

  const filtered = useMemo(() => {
    return productsMock.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || p.category === categoryFilter;

      const matchesStock =
        stockFilter === "All" ||
        (stockFilter === "In" && p.inStock) ||
        (stockFilter === "Out" && !p.inStock);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [search, categoryFilter, stockFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  const totalProducts = productsMock.length;
  const inStockCount = productsMock.filter((p) => p.inStock).length;
  const avgPrice =
    productsMock.reduce((sum, p) => sum + p.price, 0) / totalProducts;

  const stockBadgeColor = (p) => (p.inStock ? "green" : "red");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold">{t.title}</h1>
          <p className="text-sm text-slate-500">{t.subtitle}</p>
        </div>
        <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-900 rounded-lg p-1 text-xs">
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-1 rounded-lg ${
              view === "grid"
                ? "bg-white dark:bg-slate-800 shadow text-slate-900 dark:text-slate-50"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            {t.gridView}
          </button>
          <button
            onClick={() => setView("table")}
            className={`px-3 py-1 rounded-lg ${
              view === "table"
                ? "bg-white dark:bg-slate-800 shadow text-slate-900 dark:text-slate-50"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            {t.tableView}
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-3 md:grid-cols-3">
        <Card>
          <CardBody>
            <p className="text-xs text-slate-500 uppercase">
              {t.totalProducts}
            </p>
            <p className="text-2xl font-semibold mt-1">{totalProducts}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-xs text-slate-500 uppercase">
              {t.inStockCount}
            </p>
            <p className="text-2xl font-semibold mt-1">{inStockCount}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-xs text-slate-500 uppercase">
              {t.avgPrice}
            </p>
            <p className="text-2xl font-semibold mt-1">
              ${avgPrice.toFixed(2)}
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardBody className="grid gap-3 md:grid-cols-3">
          <Input
            label={t.searchLabel}
            placeholder={
              isArabic
                ? "بحث باسم المنتج أو الكود..."
                : "Search by name or SKU..."
            }
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              {t.categoryLabel}
            </label>
            <select
              className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? t.all : c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              {t.stockLabel}
            </label>
            <select
              className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
              value={stockFilter}
              onChange={(e) => {
                setStockFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="All">{t.all}</option>
              <option value="In">{t.inStock}</option>
              <option value="Out">{t.outOfStock}</option>
            </select>
          </div>
        </CardBody>
      </Card>

      {/* Grid View (مناسب للموبايل والتابلت) */}
      {view === "grid" && (
        <Card>
          <CardBody>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((p) => (
                <div
                  key={p.id}
                  className="border border-slate-200 dark:border-slate-800 rounded-lg p-3 space-y-1 bg-white dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{p.name}</span>
                    <Badge color={stockBadgeColor(p)}>
                      {p.inStock ? t.inStock : t.outOfStock}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">
                    {t.sku}: {p.sku}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t.category}: {p.category}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    {t.price}: ${p.price.toFixed(2)}
                  </p>
                  <p className="text-[11px] text-amber-500">
                    {t.rating}: {p.rating.toFixed(1)} ★
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-4">
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
      )}

      {/* Table View (مفضل للديسكتوب) */}
      {view === "table" && (
        <Card>
          <CardBody className="space-y-3">
            <Table>
              <THead>
                <tr>
                  <TH>{t.name}</TH>
                  <TH>{t.sku}</TH>
                  <TH>{t.category}</TH>
                  <TH>{t.price}</TH>
                  <TH>{t.availability}</TH>
                  <TH>{t.rating}</TH>
                </tr>
              </THead>
              <TBody>
                {paginated.map((p) => (
                  <TR key={p.id} className="cursor-default">
                    <TD>{p.name}</TD>
                    <TD>{p.sku}</TD>
                    <TD>{p.category}</TD>
                    <TD>${p.price.toFixed(2)}</TD>
                    <TD>
                      <Badge color={stockBadgeColor(p)}>
                        {p.inStock ? t.inStock : t.outOfStock}
                      </Badge>
                    </TD>
                    <TD>{p.rating.toFixed(1)} ★</TD>
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
      )}
    </div>
  );
}
