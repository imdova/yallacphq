import type { Course } from "@/types/course";
import { delay } from "./delay";

const store: Course[] = [
  {
    id: "1",
    title: "CPHQ Comprehensive Review 2024",
    tag: "Exam Prep",
    rating: 4.9,
    reviewCount: 128,
    instructorName: "Dr. Sarah Johnson",
    instructorTitle: "CPHQ, Healthcare Quality Director",
    durationHours: 12.5,
    level: "Intermediate",
    certificationType: "CPHQ Prep",
  },
  {
    id: "2",
    title: "Quality Improvement Methodologies",
    tag: "Quality Management",
    rating: 4.8,
    reviewCount: 94,
    instructorName: "Michael Chen",
    instructorTitle: "Quality Consultant",
    durationHours: 8,
    level: "Intermediate",
    certificationType: "CME Credits",
  },
  {
    id: "3",
    title: "Patient Safety Fundamentals",
    tag: "Free Resource",
    rating: 4.7,
    reviewCount: 256,
    instructorName: "Dr. Emily Ross",
    instructorTitle: "Patient Safety Officer",
    durationHours: 4,
    level: "Beginner",
  },
  {
    id: "4",
    title: "Advanced Healthcare Analytics",
    tag: "Advanced",
    rating: 4.9,
    reviewCount: 72,
    instructorName: "James Wilson",
    instructorTitle: "Data & Analytics Lead",
    durationHours: 15,
    level: "Advanced",
    certificationType: "Micro-Credential",
  },
  {
    id: "5",
    title: "Data Analysis for Quality Teams",
    tag: "Data Analysis",
    rating: 4.6,
    reviewCount: 58,
    instructorName: "Lisa Park",
    instructorTitle: "Biostatistician",
    durationHours: 6,
    level: "Intermediate",
  },
  {
    id: "6",
    title: "Regulatory Compliance in Healthcare",
    tag: "Compliance",
    rating: 4.8,
    reviewCount: 89,
    instructorName: "David Moore",
    instructorTitle: "Compliance Officer",
    durationHours: 10,
    level: "Advanced",
    certificationType: "CME Credits",
  },
  {
    id: "7",
    title: "CPHQ Practice Exams & Strategies",
    tag: "Exam Prep",
    rating: 4.9,
    reviewCount: 201,
    instructorName: "Dr. Sarah Johnson",
    instructorTitle: "CPHQ, Healthcare Quality Director",
    durationHours: 5,
    level: "Intermediate",
    certificationType: "CPHQ Prep",
  },
  {
    id: "8",
    title: "Root Cause Analysis in Healthcare",
    tag: "Quality Management",
    rating: 4.7,
    reviewCount: 112,
    instructorName: "Michael Chen",
    instructorTitle: "Quality Consultant",
    durationHours: 3,
    level: "Beginner",
  },
  {
    id: "9",
    title: "Patient Safety Culture",
    tag: "Patient Safety",
    rating: 4.8,
    reviewCount: 67,
    instructorName: "Dr. Emily Ross",
    instructorTitle: "Patient Safety Officer",
    durationHours: 4.5,
    level: "Intermediate",
  },
  {
    id: "10",
    title: "CPHQ Exam Simulation Pack",
    tag: "Exam Prep",
    rating: 4.9,
    reviewCount: 312,
    instructorName: "Yalla CPHQ Team",
    instructorTitle: "Certified Educators",
    durationHours: 6,
    level: "Intermediate",
    certificationType: "CPHQ Prep",
  },
  {
    id: "11",
    title: "Quality Tools Workshop",
    tag: "Quality Management",
    rating: 4.6,
    reviewCount: 45,
    instructorName: "James Wilson",
    instructorTitle: "Data & Analytics Lead",
    durationHours: 7,
    level: "Advanced",
  },
  {
    id: "12",
    title: "Introduction to CPHQ",
    tag: "Free Resource",
    rating: 4.7,
    reviewCount: 189,
    instructorName: "Dr. Sarah Johnson",
    instructorTitle: "CPHQ, Healthcare Quality Director",
    durationHours: 2,
    level: "Beginner",
  },
];

function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export async function getCourses(): Promise<Course[]> {
  await delay(200);
  return clone(store);
}

export async function getCourseById(id: string): Promise<Course | null> {
  await delay(100);
  const course = store.find((c) => c.id === id);
  return course ? clone(course) : null;
}
