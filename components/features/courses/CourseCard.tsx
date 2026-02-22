import Link from "next/link";
import { Star, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TAG_STYLES } from "@/constants/courses";
import type { Course } from "@/types/course";
import { cn } from "@/lib/utils";

export function CourseCard({ course }: { course: Course }) {
  const tagStyle = TAG_STYLES[course.tag] ?? "bg-zinc-600 text-white";

  return (
    <Link href={`/courses/${course.id}`} className="group block">
      <Card className="overflow-hidden border-zinc-200 transition-shadow hover:shadow-lg">
        <div className="relative aspect-video w-full bg-zinc-200">
          <div
            className="absolute inset-0 bg-gradient-to-br from-zinc-300 to-zinc-400"
            aria-hidden
          />
          <span
            className={cn(
              "absolute left-3 top-3 rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
              tagStyle
            )}
          >
            {course.tag}
          </span>
        </div>
        <CardHeader className="space-y-2 pb-2">
          <div className="flex items-center gap-1.5 text-sm text-zinc-600">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
            <span className="font-medium text-zinc-900">
              {course.rating} ({course.reviewCount} reviews)
            </span>
          </div>
          <h3 className="font-semibold leading-tight text-zinc-900 group-hover:text-gold line-clamp-2">
            {course.title}
          </h3>
        </CardHeader>
        <CardContent className="flex items-center justify-between pt-0">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-zinc-300" aria-hidden />
            <div>
              <p className="text-sm font-medium text-zinc-900">{course.instructorName}</p>
              <p className="text-xs text-zinc-500">{course.instructorTitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-zinc-500">
            <Clock className="h-4 w-4" aria-hidden />
            <span>{course.durationHours}h</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
