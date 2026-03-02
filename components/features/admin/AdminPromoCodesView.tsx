"use client";

import * as React from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/shared/data-table";
import { ConfirmDialog } from "@/components/features/admin/ConfirmDialog";
import { fetchPromoCodes, deletePromoCode } from "@/lib/dal";
import type { PromoCode } from "@/types/promo";
import { Pencil, Plus, Trash2 } from "lucide-react";

type StatusFilter = "all" | "active" | "inactive";

function formatDiscount(p: PromoCode) {
  return p.discountType === "percentage"
    ? `${p.discountValue}%`
    : `$${p.discountValue.toFixed(2)}`;
}

export function AdminPromoCodesView() {
  const [promos, setPromos] = React.useState<PromoCode[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("all");
  const [deleting, setDeleting] = React.useState<PromoCode | null>(null);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchPromoCodes();
        if (!cancelled) setPromos(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = React.useMemo(() => {
    if (statusFilter === "all") return promos;
    if (statusFilter === "active") return promos.filter((p) => p.active);
    return promos.filter((p) => !p.active);
  }, [promos, statusFilter]);

  const handleDelete = async () => {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      const ok = await deletePromoCode(deleting.id);
      if (ok) setPromos((prev) => prev.filter((p) => p.id !== deleting.id));
      setDeleteOpen(false);
      setDeleting(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns: ColumnDef<PromoCode>[] = React.useMemo(
    () => [
      {
        id: "index",
        header: "#",
        cell: ({ row }) => row.index + 1,
        size: 48,
      },
      {
        accessorKey: "code",
        header: "Promo code",
        cell: ({ row }) => (
          <span className="font-mono font-semibold text-zinc-900">{row.original.code}</span>
        ),
      },
      {
        id: "discountValue",
        header: "Discount value",
        cell: ({ row }) => (
          <span className="text-sm text-zinc-700">{formatDiscount(row.original)}</span>
        ),
      },
      {
        id: "maxUsage",
        header: "Max usage",
        cell: ({ row }) => {
          const p = row.original;
          return (
            <span className="text-sm text-zinc-600">
              {p.maxUsageEnabled && p.maxUsage != null ? p.maxUsage : "—"}
            </span>
          );
        },
      },
      {
        id: "perCustomer",
        header: "Max usage per customer",
        cell: ({ row }) => {
          const p = row.original;
          return (
            <span className="text-sm text-zinc-600">
              {p.perCustomerLimitEnabled && p.perCustomerLimit != null ? p.perCustomerLimit : "—"}
            </span>
          );
        },
      },
      {
        accessorKey: "usageCount",
        header: "Usage count",
        cell: ({ row }) => (
          <span className="text-sm text-zinc-600">{row.original.usageCount}</span>
        ),
      },
      {
        accessorKey: "active",
        header: "Active",
        cell: ({ row }) => (
          <span
            className={
              row.original.active
                ? "text-emerald-600 font-medium"
                : "text-zinc-500"
            }
          >
            {row.original.active ? "Yes" : "No"}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            <Button asChild size="sm" variant="outline" className="rounded-xl border-zinc-200">
              <Link href={`/admin/promo-codes/${row.original.id}/edit`}>
                <Pencil className="h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="rounded-xl border-zinc-200 text-red-600 hover:text-red-700"
              onClick={() => {
                setDeleting(row.original);
                setDeleteOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Promo codes</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Total promo codes ({promos.length})
          </p>
        </div>
        <Button asChild className="rounded-xl bg-zinc-900 text-white hover:bg-zinc-800">
          <Link href="/admin/promo-codes/new" className="inline-flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add new
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-700">Status</span>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
            <SelectTrigger className="h-10 w-[140px] rounded-xl border-zinc-200 bg-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-sm text-zinc-600">Loading…</div>
        ) : (
          <DataTable
            columns={columns}
            data={filtered}
            pageSize={10}
            enableRowSelection={false}
            emptyMessage="No promo codes yet. Click “Add new” to create one."
            className="[&_.rounded-md.border]:rounded-2xl [&_.rounded-md.border]:border-zinc-200"
          />
        )}
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete promo code?"
        description={
          deleting
            ? `This will permanently remove "${deleting.code}".`            : "This will permanently remove the promo code."
        }
        confirmText="Delete"
        confirmVariant="destructive"
        loading={deleteLoading}
        onConfirm={handleDelete}
      />
    </div>
  );
}
