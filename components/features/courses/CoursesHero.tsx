"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { COURSE_CATEGORIES } from "@/constants/courses";
import { cn } from "@/lib/utils";

export function CoursesHero({
  search,
  onSearchChange,
  category,
  onCategoryChange,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  category: string;
  onCategoryChange: (id: string) => void;
}) {
  return (
    <section className="border-b border-zinc-200 bg-white py-10 md:py-14" aria-labelledby="courses-hero-title">
      <div className="container max-w-4xl space-y-6">
        <h1 id="courses-hero-title" className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
          Professional Healthcare Excellence
        </h1>
        <p className="text-zinc-600">
          Master the CPHQ exam with world-class resources and guidance.
        </p>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" aria-hidden />
          <Input
            type="search"
            placeholder="Search for CPHQ exam prep, quality management..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-12 rounded-lg border-zinc-300 bg-zinc-50 pl-11 focus-visible:ring-gold"
            aria-label="Search courses"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {COURSE_CATEGORIES.map(({ id, label }) => (
            <Button
              key={id}
              variant={category === id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(id)}
              className={cn(
                "rounded-lg",
                category === id
                  ? "bg-gold text-gold-foreground hover:bg-gold/90"
                  : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"
              )}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
