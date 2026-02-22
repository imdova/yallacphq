"use client";

import * as React from "react";
import { CoursesHeader } from "@/components/features/courses/CoursesHeader";
import { CoursesHero } from "@/components/features/courses/CoursesHero";
import { CoursesFilters, type FilterState } from "@/components/features/courses/CoursesFilters";
import { CourseCard } from "@/components/features/courses/CourseCard";
import { CoursesFooter } from "@/components/features/courses/CoursesFooter";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchCourses } from "@/lib/dal/courses";
import { SORT_OPTIONS } from "@/constants/courses";
import type { Course } from "@/types/course";

const INITIAL_COUNT = 12;
const LOAD_MORE_COUNT = 6;

export default function CoursesPage() {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("all");
  const [sort, setSort] = React.useState("newest");
  const [displayCount, setDisplayCount] = React.useState(INITIAL_COUNT);
  const [filters, setFilters] = React.useState<FilterState>({
    level: [],
    duration: [],
    certification: [],
  });

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
    let list = [...courses];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.instructorName.toLowerCase().includes(q) ||
          c.tag.toLowerCase().includes(q)
      );
    }
    if (category !== "all") {
      const map: Record<string, string> = {
        "exam-prep": "Exam Prep",
        "quality-management": "Quality Management",
        "patient-safety": "Patient Safety",
        free: "Free Resource",
      };
      const tag = map[category];
      if (tag) list = list.filter((c) => c.tag === tag);
    }
    if (filters.level.length > 0) {
      list = list.filter((c) => c.level && filters.level.includes(c.level));
    }
    if (filters.duration.length > 0) {
      list = list.filter((c) => {
        const h = c.durationHours;
        if (filters.duration.includes("0-2 Hours") && h <= 2) return true;
        if (filters.duration.includes("3-6 Hours") && h >= 3 && h <= 6) return true;
        if (filters.duration.includes("6+ Hours") && h > 6) return true;
        return false;
      });
    }
    if (filters.certification.length > 0) {
      list = list.filter((c) => c.certificationType && filters.certification.includes(c.certificationType));
    }
    if (sort === "newest") {
      list.sort((a, b) => b.id.localeCompare(a.id));
    } else if (sort === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sort === "popular") {
      list.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sort === "duration-asc") {
      list.sort((a, b) => a.durationHours - b.durationHours);
    } else if (sort === "duration-desc") {
      list.sort((a, b) => b.durationHours - a.durationHours);
    }
    return list;
  }, [courses, search, category, sort, filters]);

  const visible = filtered.slice(0, displayCount);
  const hasMore = displayCount < filtered.length;

  return (
    <div className="min-h-screen bg-zinc-50">
      <CoursesHeader />
      <main>
        <CoursesHero
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
        />
        <div className="container py-8">
          <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-lg border border-zinc-200 bg-white p-4">
                <CoursesFilters value={filters} onChange={setFilters} />
              </div>
            </div>
            <div className="min-w-0">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-zinc-600">
                  Showing {visible.length} high-quality course{visible.length !== 1 ? "s" : ""}
                  {filtered.length !== courses.length && ` (filtered from ${courses.length})`}
                </p>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="w-[180px] border-zinc-300">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {loading ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-80 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100"
                    />
                  ))}
                </div>
              ) : visible.length === 0 ? (
                <div className="rounded-lg border border-zinc-200 bg-white py-16 text-center text-zinc-500">
                  No courses match your filters. Try adjusting search or filters.
                </div>
              ) : (
                <>
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {visible.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                  {hasMore && (
                    <div className="mt-10 text-center">
                      <Button
                        variant="outline"
                        className="rounded-lg border-gold text-gold-foreground hover:bg-gold/10 hover:text-gold font-semibold px-8 py-6"
                        onClick={() => setDisplayCount((n) => n + LOAD_MORE_COUNT)}
                      >
                        Load More Courses
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <CoursesFooter />
      </main>
    </div>
  );
}
