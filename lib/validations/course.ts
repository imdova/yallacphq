import { z } from "zod";

const baseCourseSchema = z.object({
  title: z.string().min(1, "Title is required").max(160),
  tag: z.string().min(1, "Tag is required").max(40),
  description: z.string().max(4000).optional(),
  whoCanAttend: z.string().max(3000).optional(),
  whyYalla: z.string().max(3000).optional(),
  instructorName: z.string().min(1, "Instructor name is required").max(120),
  instructorTitle: z.string().min(1, "Instructor title is required").max(160),
  durationHours: z.coerce.number().min(0.5, "Duration must be at least 0.5 hours").max(1000),
  priceRegular: z.coerce.number().min(0, "Price must be 0 or more").optional(),
  priceSale: z.coerce.number().min(0, "Sale price must be 0 or more").optional(),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
  certificationType: z.enum(["CPHQ Prep", "CME Credits", "Micro-Credential"]).optional(),
  enrolledCount: z.coerce.number().int().min(0, "Enrolled must be 0 or more").optional(),
  imagePlaceholder: z.string().max(240).optional(),
  imageUrl: z.string().url("Image must be a valid URL").max(500).optional(),
});

export const createCourseSchema = baseCourseSchema.superRefine((val, ctx) => {
  const regular = val.priceRegular ?? 0;
  const sale = val.priceSale;
  if (sale != null && sale > 0 && sale >= regular && regular > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["priceSale"],
      message: "Sale price must be lower than regular price.",
    });
  }
});

export const updateCourseSchema = baseCourseSchema.partial().superRefine((val, ctx) => {
  const regular = val.priceRegular;
  const sale = val.priceSale;
  if (regular != null && sale != null && sale > 0 && regular > 0 && sale >= regular) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["priceSale"],
      message: "Sale price must be lower than regular price.",
    });
  }
});

export const adminCourseCreateSchema = baseCourseSchema.extend({
  description: z.string().min(20, "Description should be at least 20 characters").max(4000),
  whoCanAttend: z.string().min(10, "Please add a short audience description").max(3000),
  whyYalla: z.string().min(10, "Please add a short value proposition").max(3000),
}).superRefine((val, ctx) => {
  const regular = val.priceRegular ?? 0;
  const sale = val.priceSale;
  if (sale != null && sale > 0 && sale >= regular && regular > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["priceSale"],
      message: "Sale price must be lower than regular price.",
    });
  }
});

export type CreateCourseSchema = z.infer<typeof createCourseSchema>;
export type UpdateCourseSchema = z.infer<typeof updateCourseSchema>;
export type AdminCourseCreateSchema = z.infer<typeof adminCourseCreateSchema>;

