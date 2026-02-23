"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Circle, Lock, Trophy, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const modules = [
  {
    id: "m1",
    title: "Module 1: QM Principles",
    completed: true,
    expanded: false,
    lessons: [],
  },
  {
    id: "m2",
    title: "Module 2: Quality Tools",
    completed: true,
    expanded: true,
    lessons: [
      { id: "l1", title: "Introduction to SPC", completed: true, current: false, locked: false },
      { id: "l2", title: "Pareto Chart Analysis", completed: false, current: true, locked: false },
      { id: "l3", title: "Control Chart Methods", completed: false, current: false, locked: true },
    ],
  },
  {
    id: "m3",
    title: "Module 3: Info Mgmt",
    completed: false,
    expanded: false,
    lessons: [],
  },
];

export function LessonSidebar() {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({
    m1: false,
    m2: true,
    m3: false,
  });

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 p-4">
        <h3 className="text-sm font-semibold text-zinc-900">Course Progress</h3>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-100">
          <div className="h-full w-[65%] rounded-full bg-gold" />
        </div>
        <p className="mt-2 text-sm text-zinc-600">65% Completed</p>
        <p className="text-xs text-zinc-500">12/18 Lessons</p>
      </div>
      <nav className="flex-1 overflow-auto p-2">
        {modules.map((mod) => (
          <div key={mod.id} className="py-1">
            <button
              type="button"
              onClick={() => toggle(mod.id)}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              {expanded[mod.id] ? (
                <ChevronDown className="h-4 w-4 shrink-0 text-zinc-500" />
              ) : (
                <ChevronRight className="h-4 w-4 shrink-0 text-zinc-500" />
              )}
              {mod.completed ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              ) : (
                <Circle className="h-4 w-4 shrink-0 text-zinc-300" />
              )}
              <span className="truncate">{mod.title}</span>
            </button>
            {expanded[mod.id] && mod.lessons.length > 0 && (
              <div className="ml-6 mt-1 space-y-0.5">
                {mod.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={lesson.locked ? "#" : "/dashboard/courses/lesson"}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm",
                      lesson.current
                        ? "bg-gold/15 font-medium text-zinc-900"
                        : "text-zinc-600 hover:bg-zinc-50",
                      lesson.locked && "pointer-events-none opacity-60"
                    )}
                  >
                    {lesson.locked ? (
                      <Lock className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                    ) : lesson.completed ? (
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    ) : (
                      <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-gold" />
                    )}
                    <span className="truncate">{lesson.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="border-t border-zinc-200 p-3">
        <Button
          asChild
          variant="outline"
          className="w-full gap-2 border-zinc-300"
        >
          <Link href="#">
            <Trophy className="h-4 w-4" />
            Download Syllabus
          </Link>
        </Button>
      </div>
    </aside>
  );
}
