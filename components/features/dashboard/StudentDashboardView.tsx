"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  BarChart3,
  Flame,
  Video,
  Play,
  MessageCircle,
  Download,
  ArrowRight,
} from "lucide-react";

const stats = [
  { label: "Hours Studied", value: "42.5h", icon: Clock },
  { label: "Quiz Avg. Score", value: "88%", icon: BarChart3 },
  { label: "Streak Days", value: "12 Days", icon: Flame },
  { label: "Live Sessions", value: "3 Sessions", icon: Video },
];

export function StudentDashboardView() {
  return (
    <div className="space-y-8">
      {/* Welcome + Current Course row */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 md:text-3xl">
            Good morning, Abdullah!
          </h1>
          <p className="mt-1 text-zinc-600">
            You&apos;re on track to complete your CPHQ certification this month.
          </p>
        </div>
        <Card className="shrink-0 border-zinc-200 bg-zinc-900 text-white lg:w-80">
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Current Course
            </p>
            <p className="mt-1 text-lg font-bold">CPHQ Mastery Prep</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-700">
                <div
                  className="h-full rounded-full bg-gold"
                  style={{ width: "68%" }}
                />
              </div>
              <span className="text-sm font-semibold text-gold">68%</span>
            </div>
            <p className="mt-2 text-sm text-white/70">14/24 Lessons Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="border-zinc-200">
            <CardContent className="p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15 text-gold">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-2xl font-bold text-zinc-900">{value}</p>
              <p className="text-sm text-zinc-600">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resume Learning + Quick Actions + Upcoming */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Resume Learning */}
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-lg font-semibold text-zinc-900">Resume Learning</h2>
          <Card className="overflow-hidden border-zinc-200">
            <div className="flex flex-col sm:flex-row">
              <div className="relative h-40 min-h-[160px] flex-1 bg-zinc-800 sm:h-auto sm:min-h-[140px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Latest Lesson
                  </span>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-4 border-t border-zinc-200 p-4 sm:border-t-0 sm:border-l">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground">
                  <Play className="h-6 w-6 fill-current pl-0.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Next Lesson
                  </p>
                  <p className="mt-0.5 font-semibold text-zinc-900">
                    Healthcare Quality Management Tools
                  </p>
                  <p className="text-sm text-zinc-500">
                    Module 4 • 18 minutes remaining
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions + Upcoming */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Quick Actions</h2>
            <div className="mt-3 space-y-2">
              <Button
                asChild
                className="w-full justify-between bg-gold text-gold-foreground hover:bg-gold/90 font-medium"
              >
                <Link href="#">
                  <span className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Join WhatsApp Group
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-between border-zinc-300 font-medium"
              >
                <Link href="#">
                  <span className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Exam Blueprint
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <Card className="border-zinc-200">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-zinc-900">
                Upcoming Live Session
              </h3>
              <div className="mt-3 flex items-start gap-3">
                <div className="flex flex-col rounded-lg bg-zinc-100 px-3 py-2 text-center">
                  <span className="text-xl font-bold text-gold">24</span>
                  <span className="text-xs font-medium text-zinc-600">OCT</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-zinc-900">
                    Biostatistics & Analysis Q&A
                  </p>
                  <p className="text-sm text-zinc-500">
                    Starts at 7:00 PM GMT
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-3 w-full text-zinc-600"
                  >
                    Set Reminder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
