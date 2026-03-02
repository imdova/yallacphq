"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { adminCourseCreateSchema } from "@/lib/validations/course";
import { createCourse } from "@/lib/dal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormField, FormInput, FormSelect } from "@/components/shared/forms";
import { cn } from "@/lib/utils";
import { ArrowLeft, Check, Image as ImageIcon, Sparkles, Users } from "lucide-react";

type FormValues = z.infer<typeof adminCourseCreateSchema>;

const TAG_OPTIONS = [
  { value: "Exam Prep", label: "Exam Prep" },
  { value: "Quality Management", label: "Quality Management" },
  { value: "Patient Safety", label: "Patient Safety" },
  { value: "Free Resource", label: "Free Resource" },
  { value: "Data Analysis", label: "Data Analysis" },
  { value: "Compliance", label: "Compliance" },
  { value: "Advanced", label: "Advanced" },
] as const;

const LEVEL_OPTIONS = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
] as const;

const CERT_OPTIONS = [
  { value: "CPHQ Prep", label: "CPHQ Prep" },
  { value: "CME Credits", label: "CME Credits" },
  { value: "Micro-Credential", label: "Micro-Credential" },
] as const;

function money(n: number) {
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "Free";
  return `$${n.toFixed(2)}`;
}

export default function AdminCourseNewPage() {
  const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: zodResolver(adminCourseCreateSchema),
    defaultValues: {
      title: "",
      tag: "Exam Prep",
      description: "",
      whoCanAttend: "",
      whyYalla: "",
      imageUrl: "",
      instructorName: "Dr Ahmed Habib",
      instructorTitle: "CPHQ, Healthcare Quality Director",
      durationHours: 2,
      priceRegular: 0,
      priceSale: undefined,
      level: "Intermediate",
      certificationType: "CPHQ Prep",
      enrolledCount: 0,
      imagePlaceholder: "",
    },
    mode: "onSubmit",
  });

  const values = methods.watch();
  const computedRegular = Number(values.priceRegular ?? 0);
  const computedSale = values.priceSale != null ? Number(values.priceSale) : undefined;
  const hasSale =
    computedSale != null &&
    computedSale > 0 &&
    computedRegular > 0 &&
    computedSale < computedRegular;
  const displayPrice = hasSale ? computedSale! : computedRegular;
  const isFree = displayPrice === 0;

  const submit = methods.handleSubmit(async (data) => {
    // Convert form to DAL input.
    await createCourse({
      title: data.title,
      tag: data.tag,
      description: data.description,
      whoCanAttend: data.whoCanAttend,
      whyYalla: data.whyYalla,
      instructorName: data.instructorName,
      instructorTitle: data.instructorTitle,
      durationHours: data.durationHours,
      priceRegular: data.priceRegular ?? 0,
      priceSale: data.priceSale,
      level: data.level,
      certificationType: data.certificationType,
      enrolledCount: data.enrolledCount ?? 0,
      imagePlaceholder: data.imagePlaceholder?.trim() || undefined,
      imageUrl: data.imageUrl?.trim() || undefined,
    });
    router.push("/admin/courses");
    router.refresh();
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:gap-10">
      <FormProvider {...methods}>
        <form onSubmit={submit} className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm" className="rounded-xl border-zinc-200">
                <Link href="/admin/courses">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
              </Button>
              <div className="min-w-0">
                <h1 className="text-xl font-bold tracking-tight text-zinc-900">Add new course</h1>
                <p className="text-sm text-zinc-600">All details in one smart form. Live preview.</p>
              </div>
            </div>
            <Button
              type="submit"
              className="rounded-xl bg-gold text-gold-foreground hover:bg-gold/90"
            >
              <Check className="h-4 w-4" />
              Create course
            </Button>
          </div>

          <Card className="rounded-2xl border-zinc-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Course details</CardTitle>
              <CardDescription>What this course is about and how it will appear.</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 grid gap-4">
              <FormField name="title" label="Course title" required>
                {({ id, error, ...rest }) => (
                  <FormInput
                    id={id}
                    error={error}
                    placeholder="e.g. CPHQ Comprehensive Review 2026"
                    className="rounded-xl border-zinc-200"
                    {...rest}
                  />
                )}
              </FormField>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormSelect
                  name="tag"
                  label="Category"
                  required
                  options={TAG_OPTIONS as unknown as { value: string; label: string }[]}
                  placeholder="Select category"
                />
                <FormSelect
                  name="level"
                  label="Level"
                  options={LEVEL_OPTIONS as unknown as { value: string; label: string }[]}
                  placeholder="Select level"
                />
              </div>

              <FormSelect
                name="certificationType"
                label="Certification type"
                options={CERT_OPTIONS as unknown as { value: string; label: string }[]}
                placeholder="Select type"
              />

              <FormField name="imageUrl" label="Course image URL (optional)">
                {({ id, error, ...rest }) => (
                  <FormInput
                    id={id}
                    error={error}
                    placeholder="https://…"
                    className="rounded-xl border-zinc-200"
                    {...rest}
                  />
                )}
              </FormField>

              <FormField name="description" label="Description" required>
                {({ id, error, ...rest }) => (
                  <textarea
                    id={id}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className={cn(
                      "min-h-[120px] w-full resize-y rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none",
                      "focus-visible:ring-2 focus-visible:ring-zinc-400/40",
                      error && "border-destructive focus-visible:ring-destructive"
                    )}
                    placeholder="Write a clear, benefit-focused summary of the course…"
                    {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                  />
                )}
              </FormField>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="rounded-2xl border-zinc-200 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-4 w-4 text-gold" />
                  Who can attend
                </CardTitle>
                <CardDescription>Target audience and prerequisites.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <FormField name="whoCanAttend" label="Audience" required>
                  {({ id, error, ...rest }) => (
                    <textarea
                      id={id}
                      aria-invalid={!!error}
                      aria-describedby={error ? `${id}-error` : undefined}
                      className={cn(
                        "min-h-[120px] w-full resize-y rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none",
                        "focus-visible:ring-2 focus-visible:ring-zinc-400/40",
                        error && "border-destructive focus-visible:ring-destructive"
                      )}
                      placeholder="Who should take this course? (roles, experience level, etc.)"
                      {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    />
                  )}
                </FormField>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-zinc-200 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Sparkles className="h-4 w-4 text-gold" />
                  Why CPHQ with Yalla CPHQ
                </CardTitle>
                <CardDescription>Your unique value proposition.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <FormField name="whyYalla" label="Why Yalla CPHQ" required>
                  {({ id, error, ...rest }) => (
                    <textarea
                      id={id}
                      aria-invalid={!!error}
                      aria-describedby={error ? `${id}-error` : undefined}
                      className={cn(
                        "min-h-[120px] w-full resize-y rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none",
                        "focus-visible:ring-2 focus-visible:ring-zinc-400/40",
                        error && "border-destructive focus-visible:ring-destructive"
                      )}
                      placeholder="Why should learners choose Yalla CPHQ for this course?"
                      {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    />
                  )}
                </FormField>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-2xl border-zinc-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Pricing & instructor</CardTitle>
              <CardDescription>Duration, pricing, and instructor details.</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField name="durationHours" label="Duration (hours)" required>
                  {({ id, error, ...rest }) => (
                    <FormInput
                      id={id}
                      error={error}
                      type="number"
                      step="0.5"
                      min="0"
                      className="rounded-xl border-zinc-200"
                      {...rest}
                    />
                  )}
                </FormField>
                <FormField name="enrolledCount" label="Enrolled (optional)">
                  {({ id, error, ...rest }) => (
                    <FormInput
                      id={id}
                      error={error}
                      type="number"
                      step="1"
                      min="0"
                      className="rounded-xl border-zinc-200"
                      {...rest}
                    />
                  )}
                </FormField>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField name="priceRegular" label="Regular price (USD)">
                  {({ id, error, ...rest }) => (
                    <FormInput
                      id={id}
                      error={error}
                      type="number"
                      step="0.01"
                      min="0"
                      className="rounded-xl border-zinc-200"
                      {...rest}
                    />
                  )}
                </FormField>
                <FormField name="priceSale" label="Sale price (optional)">
                  {({ id, error, ...rest }) => (
                    <FormInput
                      id={id}
                      error={error}
                      type="number"
                      step="0.01"
                      min="0"
                      className="rounded-xl border-zinc-200"
                      {...rest}
                    />
                  )}
                </FormField>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField name="instructorName" label="Instructor name" required>
                  {({ id, error, ...rest }) => (
                    <FormInput id={id} error={error} className="rounded-xl border-zinc-200" {...rest} />
                  )}
                </FormField>
                <FormField name="instructorTitle" label="Instructor title" required>
                  {({ id, error, ...rest }) => (
                    <FormInput
                      id={id}
                      error={error}
                      placeholder="e.g. CPHQ, Healthcare Quality Director"
                      className="rounded-xl border-zinc-200"
                      {...rest}
                    />
                  )}
                </FormField>
              </div>

              <FormField name="imagePlaceholder" label="Image placeholder (optional)">
                {({ id, error, ...rest }) => (
                  <FormInput
                    id={id}
                    error={error}
                    placeholder="e.g. linear-gradient(...) or short label"
                    className="rounded-xl border-zinc-200"
                    {...rest}
                  />
                )}
              </FormField>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-500">
              Tip: Keep the description short, clear, and exam-focused.
            </p>
            <Button type="submit" className="rounded-xl bg-gold text-gold-foreground hover:bg-gold/90">
              <Check className="h-4 w-4" />
              Create course
            </Button>
          </div>
        </form>
      </FormProvider>

      {/* Live preview */}
      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <Card className="rounded-2xl border-zinc-200 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-gold" />
              Live preview
            </CardTitle>
            <CardDescription>How it will look in the catalog</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
              <div
                className={cn(
                  "relative aspect-video bg-gradient-to-br from-zinc-200 to-zinc-300",
                  values.imageUrl?.trim() && "bg-cover bg-center"
                )}
                style={
                  values.imageUrl?.trim()
                    ? { backgroundImage: `url(${values.imageUrl.trim()})` }
                    : undefined
                }
              >
                <span className="absolute left-3 top-3 rounded-lg bg-gold px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-gold-foreground shadow-sm">
                  {values.tag || "Category"}
                </span>
                {isFree ? (
                  <span className="absolute right-3 top-3 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm">
                    Free
                  </span>
                ) : null}
                {!values.imageUrl?.trim() ? (
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-lg bg-white/90 px-2.5 py-1 text-xs font-semibold text-zinc-800 shadow-sm">
                    <ImageIcon className="h-4 w-4 text-zinc-600" />
                    Add an image URL to preview
                  </span>
                ) : null}
              </div>
              <div className="space-y-3 p-4">
                <div className="font-semibold text-zinc-900 line-clamp-2">
                  {values.title?.trim() ? values.title : "Course title"}
                </div>
                <p className="text-sm text-zinc-600 line-clamp-2">
                  {values.description?.trim() ? values.description : "Course description…"}
                </p>
                <div className="text-sm text-zinc-600">
                  {values.instructorName || "Instructor"} • {values.durationHours || 0}h
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    {hasSale ? (
                      <span className="mr-2 text-xs text-zinc-400 line-through">
                        {money(computedRegular)}
                      </span>
                    ) : null}
                    <span className={cn("font-semibold", hasSale ? "text-gold" : "text-zinc-900")}>
                      {money(displayPrice)}
                    </span>
                  </div>
                  <span className="rounded-lg bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-700">
                    {values.level ?? "Level"}
                  </span>
                </div>
                <Button type="button" className="w-full rounded-xl bg-gold text-gold-foreground hover:bg-gold/90">
                  View details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-zinc-200 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Summary</CardTitle>
            <CardDescription>Quick validation hints</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 space-y-2 text-sm">
            <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <span className="text-zinc-600">Access</span>
              <span className="font-semibold text-zinc-900">{isFree ? "Free" : "Paid"}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <span className="text-zinc-600">Certification</span>
              <span className="font-semibold text-zinc-900">{values.certificationType ?? "—"}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <span className="text-zinc-600">Enrolled</span>
              <span className="font-semibold text-zinc-900">{Number(values.enrolledCount ?? 0).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <span className="text-zinc-600">Image</span>
              <span className="font-semibold text-zinc-900">{values.imageUrl?.trim() ? "Added" : "None"}</span>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
