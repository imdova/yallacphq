"use client";

import * as React from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/shared/data-table";
import { ConfirmDialog } from "@/components/features/admin/ConfirmDialog";
import { CourseUpsertModal } from "@/components/features/admin/CourseUpsertModal";
import { createCourse, fetchCourses, removeCourse, updateCourse } from "@/lib/dal";
import type { Course } from "@/types/course";
import type { CreateCourseSchema } from "@/lib/validations/course";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";

type AccessFilter = "all" | "free" | "paid";

function formatPrice(c: Course) {
  const hasSale =
    c.priceSale != null && c.priceSale > 0 && (c.priceRegular ?? 0) > (c.priceSale ?? 0);
  const display = hasSale ? c.priceSale! : (c.priceRegular ?? 0);
  const label = display === 0 ? "Free" : `$${display.toFixed(2)}`;
  const strike = hasSale ? `$${(c.priceRegular ?? 0).toFixed(2)}` : null;
  return { label, strike };
}

export function AdminCoursesView() {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [access, setAccess] = React.useState<AccessFilter>("all");

  const [mode, setMode] = React.useState<"create" | "edit">("create");
  const [editing, setEditing] = React.useState<Course | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [deleting, setDeleting] = React.useState<Course | null>(null);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchCourses();
        if (!cancelled) setCourses(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const isFree = (c.priceSale ?? c.priceRegular ?? 0) === 0;
      if (access === "free" && !isFree) return false;
      if (access === "paid" && isFree) return false;
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        c.tag.toLowerCase().includes(q) ||
        c.instructorName.toLowerCase().includes(q)
      );
    });
  }, [courses, query, access]);

  const handleUpsert = async (data: CreateCourseSchema) => {
    const payload = {
      title: data.title,
      tag: data.tag,
      instructorName: data.instructorName,
      instructorTitle: data.instructorTitle,
      durationHours: data.durationHours,
      priceRegular: data.priceRegular ?? 0,
      priceSale: data.priceSale,
    };

    if (mode === "create") {
      const created = await createCourse(payload);
      setCourses((prev) => [...prev, created]);
      return;
    }
    if (!editing) return;
    const updated = await updateCourse(editing.id, payload);
    if (!updated) return;
    setCourses((prev) => prev.map((c) => (c.id === editing.id ? updated : c)));
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      const ok = await removeCourse(deleting.id);
      if (ok) setCourses((prev) => prev.filter((c) => c.id !== deleting.id));
      setDeleteOpen(false);
      setDeleting(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns: ColumnDef<Course>[] = React.useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Course",
        cell: ({ row }) => (
          <div className="min-w-0">
            <div className="truncate font-semibold text-zinc-900">{row.original.title}</div>
            <div className="truncate text-xs text-zinc-500">{row.original.instructorName}</div>
          </div>
        ),
      },
      {
        accessorKey: "tag",
        header: "Tag",
        cell: ({ row }) => (
          <span className="rounded-lg bg-zinc-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-zinc-700">
            {row.original.tag}
          </span>
        ),
      },
      {
        id: "price",
        header: "Price",
        cell: ({ row }) => {
          const { label, strike } = formatPrice(row.original);
          return (
            <div className="text-sm">
              {strike ? <span className="mr-2 text-xs text-zinc-400 line-through">{strike}</span> : null}
              <span className="font-semibold text-zinc-900">{label}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "durationHours",
        header: "Duration",
        cell: ({ row }) => <span className="text-sm text-zinc-700">{row.original.durationHours}h</span>,
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="rounded-xl border-zinc-200"
              onClick={() => {
                setMode("edit");
                setEditing(row.original);
                setModalOpen(true);
              }}
            >
              <Pencil className="h-4 w-4" />
              Edit
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
      <Card className="rounded-2xl border-zinc-200 bg-white shadow-sm">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between space-y-0">
          <div>
            <CardTitle className="text-base">Courses</CardTitle>
            <CardDescription>Manage catalog, pricing, and publishing.</CardDescription>
          </div>
          <Button asChild className="rounded-xl bg-gold text-gold-foreground hover:bg-gold/90">
            <Link href="/admin/courses/new" className="inline-flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add course
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, tag, instructor…"
                className="h-10 rounded-xl border-zinc-200 bg-white pl-9"
              />
            </div>
            <Select value={access} onValueChange={(v) => setAccess(v as AccessFilter)}>
              <SelectTrigger className="h-10 w-full rounded-xl border-zinc-200 bg-white sm:w-[180px]">
                <SelectValue placeholder="Access" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-10 text-center text-sm text-zinc-600">
              Loading…
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filtered}
              pageSize={10}
              enableRowSelection={false}
              emptyMessage="No courses found."
              className="[&_.rounded-md.border]:rounded-2xl [&_.rounded-md.border]:border-zinc-200"
            />
          )}
        </CardContent>
      </Card>

      <CourseUpsertModal
        open={modalOpen}
        mode={mode}
        course={editing}
        onOpenChange={setModalOpen}
        onSubmit={handleUpsert}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete course?"
        description={deleting ? `This will permanently remove “${deleting.title}”.` : "This will permanently remove the course."}
        confirmText="Delete"
        confirmVariant="destructive"
        loading={deleteLoading}
        onConfirm={handleDelete}
      />
    </div>
  );
}

