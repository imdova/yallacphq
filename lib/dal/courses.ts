import * as db from "@/lib/db/courses";
import type { Course, CreateCourseInput, UpdateCourseInput } from "@/types/course";

export async function fetchCourses(): Promise<Course[]> {
  return db.getCourses();
}

export async function fetchCourseById(id: string): Promise<Course | null> {
  return db.getCourseById(id);
}

export async function createCourse(data: CreateCourseInput): Promise<Course> {
  return db.createCourse(data);
}

export async function updateCourse(id: string, data: UpdateCourseInput): Promise<Course | null> {
  return db.updateCourse(id, data);
}

export async function removeCourse(id: string): Promise<boolean> {
  return db.deleteCourse(id);
}
