"use client";

import Link from "next/link";
import { LessonPageHeader } from "@/components/features/dashboard/LessonPageHeader";
import { LessonSidebar } from "@/components/features/dashboard/LessonSidebar";
import { LessonContentView } from "@/components/features/dashboard/LessonContentView";

export default function LessonPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <LessonPageHeader />
      <div className="flex-1">
        <div className="border-b border-zinc-200 bg-white px-4 py-2 md:px-6">
          <nav className="text-sm text-zinc-500" aria-label="Breadcrumb">
            <Link href="/dashboard/courses" className="hover:text-zinc-700">
              My Courses
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-900">Healthcare Quality Tools</span>
          </nav>
        </div>
        <div className="flex">
          <LessonSidebar />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <LessonContentView />
          </main>
        </div>
      </div>
    </div>
  );
}
