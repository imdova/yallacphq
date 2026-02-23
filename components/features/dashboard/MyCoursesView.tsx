"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, CheckCircle2, LayoutGrid, List } from "lucide-react";

const READINESS_STAGES = [
  { label: "Foundation", key: "foundation" },
  { label: "Intermediate", key: "intermediate" },
  { label: "Advanced", key: "advanced" },
  { label: "Exam Ready", key: "exam" },
];

const CURRENT_COURSES = [
  {
    id: "1",
    title: "Healthcare Quality Strategy",
    instructor: "Dr. Alan Grant",
    nextLesson: "Stakeholder Alignment",
    progress: 82,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&q=80",
  },
  {
    id: "2",
    title: "Data Analysis for Healthcare",
    instructor: "Dr. Alan Grant",
    nextLesson: "Descriptive Statistics",
    progress: 45,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
  },
  {
    id: "3",
    title: "Risk Management Protocols",
    instructor: "Dr. Alan Grant",
    nextLesson: "FMEA Introduction",
    progress: 12,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80",
  },
  {
    id: "6",
    title: "Clinical Quality Improvement",
    instructor: "Dr. Alan Grant",
    nextLesson: "Introduction",
    progress: 0,
    image: "https://images.unsplash.com/photo-1579154204342-9d7bd0a861541?w=400&q=80",
  },
];

const COMPLETED_COURSES = [
  {
    id: "4",
    title: "Foundations of Healthcare Quality",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80",
  },
  {
    id: "5",
    title: "CPHQ Terminology & Definitions",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80",
  },
];

export function MyCoursesView() {
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  const filters = [
    { key: "all", label: "All Courses" },
    { key: "exams", label: "Exams" },
    { key: "quality", label: "Quality Tools" },
    { key: "workshops", label: "Workshops" },
  ];

  return (
    <div className="space-y-8">
      {/* Certification Readiness */}
      <section>
        <h2 className="text-xl font-bold text-zinc-900">Certification Readiness</h2>
        <p className="mt-0.5 text-sm text-zinc-600">CPHQ Exam Preparation Status</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200">
              <div
                className="h-full rounded-full bg-gold transition-all"
                style={{ width: "65%" }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {READINESS_STAGES.map(({ label }) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
          <span className="text-2xl font-bold text-zinc-900 sm:ml-4">65%</span>
        </div>
      </section>

      {/* Filter tabs + view mode */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveFilter(key)}
              className={`
                rounded-full px-4 py-2 text-sm font-medium transition-colors
                ${activeFilter === key ? "bg-gold text-gold-foreground" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"}
              `}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`rounded-lg p-2 ${viewMode === "grid" ? "bg-zinc-200 text-zinc-900" : "text-zinc-400 hover:bg-zinc-100"}`}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`rounded-lg p-2 ${viewMode === "list" ? "bg-zinc-200 text-zinc-900" : "text-zinc-400 hover:bg-zinc-100"}`}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Current Learning */}
      <section>
        <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-900">
          <Play className="h-5 w-5 text-gold" />
          Current Learning
        </h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {CURRENT_COURSES.map((course) => (
            <Card key={course.id} className="overflow-hidden border-zinc-200">
              <div className="relative h-36 bg-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={course.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-zinc-900">{course.title}</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  Instructor: {course.instructor}
                </p>
                {course.progress > 0 && (
                  <p className="mt-1 text-sm text-zinc-600">
                    Next: {course.nextLesson}
                  </p>
                )}
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className="h-full rounded-full bg-gold"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-zinc-700">
                    {course.progress}%
                  </span>
                </div>
                <Button
                  asChild
                  className="mt-4 w-full gap-2 bg-zinc-900 text-white hover:bg-zinc-800"
                >
                  <Link href={course.progress === 0 ? "/dashboard/courses/lesson" : "/dashboard/courses/lesson"}>
                    <Play className="h-4 w-4 fill-current" />
                    {course.progress === 0 ? "Start My Course" : "Resume Studying"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Completed */}
      <section>
        <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-900">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          Completed
        </h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          {COMPLETED_COURSES.map((course) => (
            <Card key={course.id} className="overflow-hidden border-zinc-200">
              <div className="relative h-36 bg-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={course.image}
                  alt=""
                  className="h-full w-full object-cover grayscale"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <CheckCircle2 className="h-16 w-16 text-white drop-shadow-lg" />
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-zinc-900">{course.title}</h3>
                <div className="mt-4 flex gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-zinc-300"
                  >
                    <Link href="#">Review</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-zinc-300"
                  >
                    <Link href="#">Certificate</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
