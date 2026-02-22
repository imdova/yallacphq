export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
export type DurationRange = "0-2 Hours" | "3-6 Hours" | "6+ Hours";
export type CertificationType = "CPHQ Prep" | "CME Credits" | "Micro-Credential";

export interface Course {
  id: string;
  title: string;
  tag: string;
  rating: number;
  reviewCount: number;
  instructorName: string;
  instructorTitle: string;
  durationHours: number;
  level?: CourseLevel;
  certificationType?: CertificationType;
  imagePlaceholder?: string;
}
