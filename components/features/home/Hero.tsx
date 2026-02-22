import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-teal-dark via-teal to-black px-4 py-20 md:py-28"
      aria-label="Hero"
    >
      <div className="container relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="max-w-xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-widest text-white/80">
            Confidence in Healthcare, Built for You
          </p>
          <h1 className="space-y-1">
            <span className="block text-4xl font-semibold text-white md:text-5xl lg:text-6xl">
              Master
            </span>
            <span className="block font-serif text-4xl font-semibold text-gold md:text-5xl lg:text-6xl">
              Healthcare Quality
            </span>
          </h1>
          <p className="max-w-md text-base leading-relaxed text-white/90">
            Prepare for the Certified Professional in Healthcare Quality (CPHQ) exam with programs
            designed by industry experts. Build the skills and confidence to lead quality
            improvement in your organization.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              asChild
              className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold uppercase px-6 py-6"
            >
              <Link href="#enroll">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-gold text-white hover:bg-gold/10 hover:text-white font-semibold uppercase px-6 py-6"
            >
              <Link href="#programs">View Program</Link>
            </Button>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div
            className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-60"
            aria-hidden
          />
          <div className="relative flex h-[420px] items-center justify-center rounded-lg border border-gold/20 bg-white/5 backdrop-blur-sm">
            <div className="text-center text-white/40">
              <svg
                className="mx-auto h-48 w-48"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={0.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636 4.318 15.318a4.5 4.5 0 106.364 6.364z"
                />
              </svg>
              <span className="text-sm">Healthcare illustration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
