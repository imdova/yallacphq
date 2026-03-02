"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BadgeDollarSign,
  GraduationCap,
  ShoppingBag,
  Users,
  Sparkles,
  Activity,
} from "lucide-react";

const kpis = [
  { label: "Active learners", value: "1,284", delta: "+8.2%", icon: Users },
  { label: "Course enrollments", value: "3,912", delta: "+5.1%", icon: GraduationCap },
  { label: "Revenue (MTD)", value: "$24,680", delta: "+12.4%", icon: BadgeDollarSign },
  { label: "Orders (24h)", value: "46", delta: "+3", icon: ShoppingBag },
] as const;

const activity = [
  { label: "New user registration", meta: "lina@example.com · member", time: "2m ago" },
  { label: "Course purchased", meta: "CPHQ Comprehensive Review 2024", time: "18m ago" },
  { label: "Offer page visit spike", meta: "Start your journey today", time: "1h ago" },
  { label: "Webinar spot reserved", meta: "CPHQ Webinar 1", time: "3h ago" },
] as const;

export function AdminOverviewView() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(({ label, value, delta, icon: Icon }) => (
          <Card key={label} className="rounded-2xl border-zinc-200 bg-white shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  {delta}
                </span>
              </div>
              <div className="mt-3 text-2xl font-bold text-zinc-900">{value}</div>
              <div className="text-sm text-zinc-600">{label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl border-zinc-200 bg-white shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Activity</CardTitle>
              <CardDescription>What’s happening across the platform</CardDescription>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700">
              <Activity className="h-4 w-4" aria-hidden />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="divide-y divide-zinc-100 rounded-xl border border-zinc-200 bg-white">
              {activity.map((a, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-zinc-900">{a.label}</div>
                    <div className="truncate text-xs text-zinc-500">{a.meta}</div>
                  </div>
                  <div className="shrink-0 text-xs font-medium text-zinc-500">{a.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-2xl border-zinc-200 bg-gradient-to-br from-white via-white to-zinc-50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-gold" />
                Quick actions
              </CardTitle>
              <CardDescription>Common admin tasks</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <Button asChild className="w-full justify-between rounded-xl bg-gold text-gold-foreground hover:bg-gold/90">
                <Link href="/admin/users">
                  Manage users
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-between rounded-xl border-zinc-200">
                <Link href="/admin/courses">
                  Manage courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-between rounded-xl border-zinc-200">
                <Link href="/admin/offers">
                  Update offers
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-zinc-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">System status</CardTitle>
              <CardDescription>High-level health checks</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {[
                { label: "Email delivery", status: "Operational" },
                { label: "Payments", status: "Operational" },
                { label: "Video playback", status: "Operational" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                  <span className="text-sm font-medium text-zinc-900">{s.label}</span>
                  <span className="text-xs font-semibold text-emerald-700">{s.status}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

