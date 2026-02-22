import * as db from "@/lib/db/courses";
import type { Course } from "@/types/course";

export async function fetchCourses(): Promise<Course[]> {
  return db.getCourses();
}

export async function fetchCourseById(id: string): Promise<Course | null> {
  return db.getCourseById(id);
}
