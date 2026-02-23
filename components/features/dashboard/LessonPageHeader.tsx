"use client";

import Link from "next/link";
import { Search, Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";

const navLinks = [
  { href: "/dashboard/courses", label: "My Courses" },
  { href: "/dashboard/exams", label: "Mock Exams" },
  { href: "/dashboard/study-groups", label: "Study Groups" },
  { href: "/dashboard/support", label: "Help Center" },
];

export function LessonPageHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-6 border-b border-zinc-200 bg-white px-4 md:px-6">
      <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gold text-gold-foreground">
          <Lightbulb className="h-4 w-4" />
        </span>
        <span className="font-semibold text-zinc-900">Yalla CPHQ</span>
      </Link>
      <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            type="search"
            placeholder="Search topics, tools..."
            className="h-9 rounded-lg border-zinc-200 bg-zinc-50 pl-9 pr-4 text-sm"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-zinc-900">Ahmed Hassan</p>
          <p className="text-xs text-zinc-500">Student ID: #8821</p>
        </div>
        <div className="h-8 w-8 shrink-0 rounded-full bg-zinc-200" />
      </div>
    </header>
  );
}
