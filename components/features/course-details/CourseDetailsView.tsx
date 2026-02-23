"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Check,
  Play,
  Star,
  Users,
  ChevronDown,
  ChevronRight,
  Facebook,
  Youtube,
  Linkedin,
  Lightbulb,
} from "lucide-react";
import { CourseCard } from "@/components/features/courses/CourseCard";
import { fetchCourses } from "@/lib/dal/courses";
import type { Course } from "@/types/course";

const COURSE_INCLUDES = [
  "Lifetime Access",
  "Certificate of Completion",
  "Printable Workbooks",
  "Mobile & Tablet Friendly",
  "8 Full-length Mock Exams",
  "Private Community Access",
];

const LEARN_ITEMS = [
  "Master patient safety and data management protocols.",
  "Understand the latest regulatory requirements and compliance.",
  "Develop effective performance measurement systems.",
  "Apply data analytics to healthcare quality improvement.",
  "Lead improvement and strategic planning.",
  "Full mock exam evaluation with detailed answers.",
];

const WHO_SHOULD_ATTEND = [
  { label: "Quality Managers", icon: "📋" },
  { label: "Risk Managers", icon: "🛡️" },
  { label: "Physicians", icon: "👨‍⚕️" },
  { label: "Nurses", icon: "👩‍⚕️" },
];

const WHY_JOIN = [
  {
    title: "Official Curriculum",
    text: "A global university with the latest NABSG standards, ensuring you cover every topic tested in the actual CPHQ examination.",
  },
  {
    title: "Expert Mentorship",
    text: "Direct access to a CPHQ certified lecturer who provides real-world insights and guidance through sample case studies.",
  },
  {
    title: "High Success Rate",
    text: "As in our 90% pass rate, ensuring our methodology is optimized for memory retention and a steep learning curve.",
  },
  {
    title: "Lifetime Updates",
    text: "Benefit is updated annually, plus you will receive all future updates to the curriculum and exam tools.",
  },
];

const CURRICULUM_MODULES = [
  { id: "1", title: "Module 1: Quality Leadership & Integration", lessons: 15, duration: "6h 30m", expanded: false },
  {
    id: "2",
    title: "Module 2: Data Analytics",
    lessons: 45,
    duration: "16h 30m",
    expanded: true,
    subLessons: [
      { title: "Introduction to Statistical Process Control (SPC)", duration: "3:23" },
      { title: "Mastering Stat Charts & Control Charts", duration: "4:20" },
    ],
  },
  { id: "3", title: "Module 3: Performance Improvement & Patient Safety", lessons: 25, duration: "10h 15m", expanded: false },
];

const TESTIMONIALS = [
  {
    name: "Dr. Rowan M.",
    quote: "The mock exams were identical to the real CPHQ exam. The way Dr. Sarah explains data analytics makes it so simple. Passed from the first try!",
    cta: "Preview My First Try",
  },
  {
    name: "Mona Fathima S.",
    quote: "I was struggling with Patient Safety before I joined Yalla CPHQ. The private community's support is amazing. Highly recommended!",
    cta: "Preview My Results",
  },
];

const FOOTER_PROGRAMS = ["CPHQ Preparation", "Patient Safety Report", "Healthcare Analysis", "Risk Management"];
const FOOTER_COMPANY = ["About Us", "Instructors", "Success Stories", "Contact"];

function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`flex items-center gap-3 text-2xl font-bold text-zinc-900 ${className}`}>
      <span className="h-8 w-1 shrink-0 rounded-full bg-gold" />
      {children}
    </h2>
  );
}

const RELATED_COUNT = 4;

export function CourseDetailsView() {
  const [expandedModules, setExpandedModules] = React.useState<Record<string, boolean>>({
    "1": false,
    "2": true,
    "3": false,
  });
  const [sampleEmail, setSampleEmail] = React.useState("");
  const [relatedCourses, setRelatedCourses] = React.useState<Course[]>([]);

  React.useEffect(() => {
    let cancelled = false;
    fetchCourses().then((list) => {
      if (!cancelled) setRelatedCourses(list.slice(0, RELATED_COUNT));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-900 px-4 py-4 md:px-6">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-gold">CPHQ</span>
            <span className="text-white">Preparation Program</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
              <Link href="/#contact">Contact us</Link>
            </Button>
            <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold">
              <Link href="/checkout">Enroll Now</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-zinc-900 px-4 py-12 md:px-6 md:py-16">
        <div className="container grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
          <div className="flex flex-col justify-center">
            <span className="inline-block w-fit rounded bg-gold px-3 py-1 text-xs font-semibold uppercase text-gold-foreground">
              Best Seller
            </span>
            <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              CPHQ Preparation Program 2024
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              The most comprehensive guide to mastering Healthcare Quality Management. Pass your CPHQ exam on the first attempt.
            </p>
            <div className="mt-6 flex gap-8">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-gold text-gold" />
                <div>
                  <p className="text-xl font-bold text-white">4.9</p>
                  <p className="text-xs text-white/70">Amazing Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gold" />
                <div>
                  <p className="text-xl font-bold text-white">2,400+</p>
                  <p className="text-xs text-white/70">Enrolled Students</p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold">
                <Link href="/offers/cphq-register-1">Get Started Today</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <a href="#curriculum">View Curriculum</a>
              </Button>
            </div>
          </div>
          <div className="relative flex items-center justify-center rounded-xl bg-zinc-800">
            <div className="aspect-video w-full max-w-lg overflow-hidden rounded-lg">
              <div className="flex h-full w-full items-center justify-center bg-zinc-800">
                <button
                  type="button"
                  className="flex flex-col items-center gap-2 text-white"
                  aria-label="Preview course"
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold text-gold-foreground hover:bg-gold/90">
                    <Play className="h-10 w-10 fill-current pl-1" />
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-wide">Preview Course</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main: two columns */}
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          {/* Left column - content */}
          <div className="min-w-0 space-y-16">
            {/* What You'll Learn */}
            <section>
              <SectionTitle>What You&apos;ll Learn</SectionTitle>
              <ul className="mt-6 space-y-3">
                {LEARN_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <span className="text-zinc-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Who Should Attend */}
            <section>
              <SectionTitle>Who Should Attend</SectionTitle>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {WHO_SHOULD_ATTEND.map(({ label, icon }) => (
                  <Card key={label} className="border-zinc-200 text-center">
                    <CardContent className="p-6">
                      <span className="text-3xl" aria-hidden>{icon}</span>
                      <p className="mt-2 font-semibold text-zinc-900">{label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Why Join + Sample Lesson row */}
            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              <section className="rounded-xl bg-zinc-900 p-6 text-white md:p-8">
                <SectionTitle className="!text-white">Why Join This Course?</SectionTitle>
                <div className="mt-6 space-y-6">
                  {WHY_JOIN.map(({ title, text }) => (
                    <div key={title} className="flex gap-3">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-gold mt-2" />
                      <div>
                        <h3 className="font-semibold uppercase tracking-wider text-gold">{title}</h3>
                        <p className="mt-1 text-sm text-white/80">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <Card className="h-fit border-zinc-800 bg-zinc-900">
                <CardContent className="p-6 text-white">
                  <h3 className="font-semibold text-lg">Want a Free Sample Lesson?</h3>
                  <p className="mt-2 text-sm text-white/70">
                    Join 20k+ Healthcare pros in our quality examination.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={sampleEmail}
                      onChange={(e) => setSampleEmail(e.target.value)}
                      className="border-zinc-600 bg-zinc-800 text-white placeholder:text-zinc-400"
                    />
                    <Button className="shrink-0 bg-gold text-gold-foreground hover:bg-gold/90">
                      Send Sample
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Smart Curriculum */}
            <section id="curriculum">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <SectionTitle>Smart Curriculum</SectionTitle>
                <span className="text-sm text-zinc-600">
                  12 Modules • 140 Lessons • 47h total length{" "}
                  <button type="button" className="font-semibold text-gold hover:underline">
                    View Full Curriculum
                  </button>
                </span>
              </div>
              <div className="mt-6 space-y-2">
                {CURRICULUM_MODULES.map((mod) => (
                  <Card key={mod.id} className="border-zinc-200 overflow-hidden">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between p-4 text-left"
                      onClick={() => toggleModule(mod.id)}
                    >
                      <span className="font-medium text-zinc-900">{mod.title}</span>
                      <span className="flex items-center gap-2 text-sm text-zinc-500">
                        {mod.lessons} Lessons · {mod.duration}
                        {expandedModules[mod.id] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </span>
                    </button>
                    {"subLessons" in mod && expandedModules[mod.id] && (
                      <div className="border-t border-zinc-100 bg-zinc-50 px-4 py-3">
                        {mod.subLessons!.map((s) => (
                          <div key={s.title} className="flex justify-between py-2 text-sm">
                            <span className="text-zinc-700">{s.title}</span>
                            <span className="text-zinc-500">{s.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </section>

            {/* Student Success Stories */}
            <section>
              <SectionTitle>Student Success Stories</SectionTitle>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {TESTIMONIALS.map((t) => (
                  <Card key={t.name} className="border-zinc-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-zinc-200" />
                        <div>
                          <p className="font-semibold text-zinc-900">{t.name}</p>
                          <div className="flex gap-0.5 text-gold">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-zinc-600">&ldquo;{t.quote}&rdquo;</p>
                      <Button className="mt-4 w-full bg-gold text-gold-foreground hover:bg-gold/90 text-sm font-semibold">
                        {t.cta}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Your Expert Instructor */}
            <section>
              <SectionTitle>Your Expert Instructor</SectionTitle>
              <Card className="mt-6 border-zinc-200">
                <CardContent className="p-6 md:flex md:gap-6">
                  <div className="h-24 w-24 shrink-0 rounded-full bg-zinc-200 md:h-28 md:w-28" />
                  <div className="mt-4 min-w-0 md:mt-0">
                    <h3 className="text-lg font-bold text-zinc-900">Dr. Sarah Ahmed, DPHQ, CPHQ</h3>
                    <p className="text-sm text-zinc-500">Senior Batch IV Consultant</p>
                    <p className="mt-3 text-sm text-zinc-600">
                      With over 20 years of experience in healthcare quality and management across leading international hospitals, Dr. Sarah has mentored over 5,000 students globally. Her teaching methodology focuses on practical application and critical thinking required for the CPHQ exam.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-6 text-sm text-zinc-500">
                      <span>15+ Months</span>
                      <span>42 Courses</span>
                      <span className="flex items-center gap-1 text-gold">4.9 Rating</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Related courses */}
            {relatedCourses.length > 0 && (
              <section>
                <SectionTitle>Related courses</SectionTitle>
                <p className="mt-2 text-sm text-zinc-600">
                  Explore more programs to support your CPHQ journey.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {relatedCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
                <div className="mt-6">
                  <Button asChild variant="outline" className="border-zinc-300 text-zinc-700 hover:bg-zinc-50">
                    <Link href="/courses">View all courses</Link>
                  </Button>
                </div>
              </section>
            )}
          </div>

          {/* Right column - sticky sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="border-zinc-200 bg-amber-50/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-zinc-900">Course Includes:</h3>
                <ul className="mt-4 space-y-2">
                  {COURSE_INCLUDES.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-zinc-700">
                      <Check className="h-5 w-5 shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <span className="text-lg text-zinc-400 line-through">$399.99</span>
                  <p className="text-3xl font-bold text-zinc-900">$199.99</p>
                </div>
                <Button asChild className="mt-6 w-full bg-gold text-gold-foreground hover:bg-gold/90 font-semibold uppercase">
                  <Link href="/checkout">Enroll Now</Link>
                </Button>
                <p className="mt-2 text-center text-xs text-zinc-500">Money-back Guarantee</p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-100">
        <div className="container px-4 py-12 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded bg-gold">
                  <Lightbulb className="h-4 w-4 text-gold-foreground" />
                </span>
                <span className="font-bold text-zinc-900">Yalla CPHQ</span>
              </div>
              <p className="mt-3 text-sm text-zinc-600">
                Empowering healthcare professionals to lead with quality and safety. Your partner in CPHQ certification success.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900">Programs</h4>
              <ul className="mt-3 space-y-2">
                {FOOTER_PROGRAMS.map((label) => (
                  <li key={label}>
                    <Link href="#" className="text-sm text-zinc-600 hover:text-zinc-900">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900">Company</h4>
              <ul className="mt-3 space-y-2">
                {FOOTER_COMPANY.map((label) => (
                  <li key={label}>
                    <Link href="#" className="text-sm text-zinc-600 hover:text-zinc-900">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900">Connect With Us</h4>
              <div className="mt-3 flex gap-3">
                <a href="#" className="text-zinc-500 hover:text-zinc-900" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="text-zinc-500 hover:text-zinc-900" aria-label="YouTube"><Youtube className="h-5 w-5" /></a>
                <a href="#" className="text-zinc-500 hover:text-zinc-900" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 sm:flex-row">
            <p className="text-sm text-zinc-500">© 2023 Yalla CPHQ, All rights reserved.</p>
            <div className="flex gap-6 text-sm text-zinc-500">
              <Link href="/privacy" className="hover:text-zinc-900">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-zinc-900">Terms of Service</Link>
              <Link href="#" className="hover:text-zinc-900">Compliance with Laws</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
