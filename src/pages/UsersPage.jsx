// src/pages/UsersPage.jsx
import { useMemo, useState } from "react";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Table, THead, TBody, TH, TR, TD } from "../components/ui/Table";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import { useUsersStore } from "../hooks/useUsersStore";
import { useSettingsStore } from "../hooks/useSettingsStore";
import { useUIStore } from "../hooks/useUIStore";

const PAGE_SIZE = 5;

export default function UsersPage() {
  // ✅ selectors منفصلة – ما فيش object جديد كل مرة
  const users = useUsersStore((s) => s.users);
  const search = useUsersStore((s) => s.search);
  const roleFilter = useUsersStore((s) => s.roleFilter);
  const statusFilter = useUsersStore((s) => s.statusFilter);
  const setSearch = useUsersStore((s) => s.setSearch);
  const setRoleFilter = useUsersStore((s) => s.setRoleFilter);
  const setStatusFilter = useUsersStore((s) => s.setStatusFilter);
  const addUser = useUsersStore((s) => s.addUser);
  const editUser = useUsersStore((s) => s.editUser);
  const deleteUser = useUsersStore((s) => s.deleteUser);

  const language = useSettingsStore((s) => s.language);
  const showToast = useUIStore((s) => s.showToast);

  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });

  const isArabic = language === "ar";

  const t = isArabic
    ? {
        title: "المستخدمون",
        subtitle: "إدارة حسابات المستخدمين، الصلاحيات والحالة.",
        searchLabel: "بحث",
        roleLabel: "الدور",
        statusLabel: "الحالة",
        all: "الكل",
        admin: "مدير",
        manager: "مشرف",
        user: "مستخدم",
        active: "نشط",
        suspended: "معلّق",
        name: "الاسم",
        email: "البريد الإلكتروني",
        createdAt: "تاريخ الإنشاء",
        actions: "الإجراءات",
        addUser: "إضافة مستخدم",
        editUser: "تعديل مستخدم",
        save: "حفظ",
        cancel: "إلغاء",
        delete: "حذف",
        pageLabel: "صفحة",
        of: "من",
        userSaved: "تم حفظ المستخدم بنجاح",
        userDeleted: "تم حذف المستخدم",
        exportCSV: "تصدير CSV",
        totalUsers: "إجمالي المستخدمين",
        activeUsers: "مستخدمون نشطون",
        admins: "عدد المدراء",
      }
    : {
        title: "Users",
        subtitle: "Manage user accounts, roles and status.",
        searchLabel: "Search",
        roleLabel: "Role",
        statusLabel: "Status",
        all: "All",
        admin: "Admin",
        manager: "Manager",
        user: "User",
        active: "Active",
        suspended: "Suspended",
        name: "Name",
        email: "Email",
        createdAt: "Created at",
        actions: "Actions",
        addUser: "Add User",
        editUser: "Edit User",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        pageLabel: "Page",
        of: "of",
        userSaved: "User saved successfully",
        userDeleted: "User deleted",
        exportCSV: "Export CSV",
        totalUsers: "Total users",
        activeUsers: "Active users",
        admins: "Admins",
      };

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        !search ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "All" || u.role.toLowerCase() === roleFilter.toLowerCase();

      const matchesStatus =
        statusFilter === "All" ||
        u.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  const statusColor = (status) => {
    if (status === "Active") return "green";
    if (status === "Suspended") return "red";
    return "gray";
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const totalAdmins = users.filter((u) => u.role === "Admin").length;

  const openAddModal = () => {
    setEditingUser(null);
    setForm({
      name: "",
      email: "",
      role: "User",
      status: "Active",
    });
    setModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingUser) {
      editUser(editingUser.id, form);
    } else {
      addUser(form);
    }
    showToast({ type: "success", message: t.userSaved });
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteUser(id);
    showToast({ type: "success", message: t.userDeleted });
  };

  const exportCSV = () => {
    const header = ["id", "name", "email", "role", "status", "createdAt"];
    const rows = filtered.map((u) => [
      u.id,
      u.name,
      u.email,
      u.role,
      u.status,
      u.createdAt,
    ]);

    const lines = [header.join(","), ...rows.map((r) => r.join(","))];
    const blob = new Blob([lines.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold">{t.title}</h1>
          <p className="text-sm text-slate-500">{t.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV}>
            {t.exportCSV}
          </Button>
          <Button size="sm" onClick={openAddModal}>
            {t.addUser}
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-3 md:grid-cols-3">
        <Card>
          <CardBody>
            <p className="text-xs text-slate-500 uppercase">
              {t.totalUsers}
            </p>
            <p className="text-2xl font-semibold mt-1">{totalUsers}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-xs text-slate-500 uppercase">
              {t.activeUsers}
            </p>
            <p className="text-2xl font-semibold mt-1">{activeUsers}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-xs text-slate-500 uppercase">
              {t.admins}
            </p>
            <p className="text-2xl font-semibold mt-1">{totalAdmins}</p>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardBody className="grid gap-3 md:grid-cols-3">
          <Input
            label={t.searchLabel}
            placeholder={
              isArabic ? "بحث بالاسم أو البريد..." : "Search by name or email..."
            }
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              {t.roleLabel}
            </label>
            <select
              className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="All">{t.all}</option>
              <option value="Admin">{t.admin}</option>
              <option value="Manager">{t.manager}</option>
              <option value="User">{t.user}</option>
            </select>
          </div>
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
              <option value="Active">{t.active}</option>
              <option value="Suspended">{t.suspended}</option>
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
                <TH>{t.name}</TH>
                <TH>{t.email}</TH>
                <TH>{t.roleLabel}</TH>
                <TH>{t.statusLabel}</TH>
                <TH>{t.createdAt}</TH>
                <TH>{t.actions}</TH>
              </tr>
            </THead>
            <TBody>
              {paginated.map((u) => (
                <TR key={u.id} className="cursor-default">
                  <TD>{u.name}</TD>
                  <TD>{u.email}</TD>
                  <TD>{u.role}</TD>
                  <TD>
                    <Badge color={statusColor(u.status)}>{u.status}</Badge>
                  </TD>
                  <TD>{u.createdAt}</TD>
                  <TD>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(u)}
                      >
                        {t.editUser}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(u.id)}
                      >
                        {t.delete}
                      </Button>
                    </div>
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
          {paginated.map((u) => (
            <div
              key={u.id}
              className="border border-slate-200 dark:border-slate-800 rounded-lg p-3 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">{u.name}</span>
                <Badge color={statusColor(u.status)}>{u.status}</Badge>
              </div>
              <p className="text-xs text-slate-500">{u.email}</p>
              <p className="text-xs text-slate-500">
                {t.roleLabel}: {u.role}
              </p>
              <p className="text-[11px] text-slate-400">
                {t.createdAt}: {u.createdAt}
              </p>
              <div className="flex gap-2 justify-end pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditModal(u)}
                >
                  {t.editUser}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(u.id)}
                >
                  {t.delete}
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

      {/* Add/Edit Modal */}
      <Modal
        title={editingUser ? t.editUser : t.addUser}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleSave}>{t.save}</Button>
          </div>
        }
      >
        <div className="space-y-3 text-sm">
          <Input
            label={t.name}
            value={form.name}
            onChange={(e) =>
              setForm((f) => ({ ...f, name: e.target.value }))
            }
          />
          <Input
            label={t.email}
            value={form.email}
            onChange={(e) =>
              setForm((f) => ({ ...f, email: e.target.value }))
            }
          />
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              {t.roleLabel}
            </label>
            <select
              className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
              value={form.role}
              onChange={(e) =>
                setForm((f) => ({ ...f, role: e.target.value }))
              }
            >
              <option value="Admin">{t.admin}</option>
              <option value="Manager">{t.manager}</option>
              <option value="User">{t.user}</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              {t.statusLabel}
            </label>
            <select
              className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
              value={form.status}
              onChange={(e) =>
                setForm((f) => ({ ...f, status: e.target.value }))
              }
            >
              <option value="Active">{t.active}</option>
              <option value="Suspended">{t.suspended}</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
