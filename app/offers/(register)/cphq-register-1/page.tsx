import { Play, GraduationCap, RefreshCw, Smartphone } from "lucide-react";
import { Register1Form } from "@/components/features/offers/Register1Form";

export default function CPHQRegister1Page() {
  return (
    <div className="bg-zinc-50/80">
      {/* Hero */}
      <section className="border-b border-zinc-200 bg-white/90 py-12 md:py-16">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 lg:items-start">
            {/* Left: Promo content + video */}
            <div className="space-y-6">
              <span className="inline-block rounded-full bg-gold px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gold-foreground">
                Free Masterclass 2024
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl lg:text-5xl">
                Unlock Your Healthcare{" "}
                <span className="font-serif text-gold">Leadership</span>
              </h1>
              <p className="max-w-lg text-zinc-600 leading-relaxed">
                Join 5,000+ professionals mastering the CPHQ exam with Yalla CPHQ&apos;s proven
                framework. Learn how to pass on your first attempt.
              </p>
              <div className="space-y-2">
                <div className="overflow-hidden rounded-xl border border-zinc-200 bg-teal-dark/90 aspect-video flex items-center justify-center">
                  <button
                    type="button"
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/90 text-gold-foreground shadow-lg transition hover:bg-gold"
                    aria-label="Play video"
                  >
                    <Play className="h-10 w-10 fill-current pl-1" />
                  </button>
                </div>
                <div className="flex items-center justify-between rounded-b-lg bg-zinc-800 px-4 py-2 text-sm text-white">
                  <span>Video: Invitation to Excellence</span>
                  <span>12:45 mins</span>
                </div>
              </div>
            </div>

            {/* Right: Registration card */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg md:p-8">
                <span className="mb-4 inline-block rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-foreground">
                  Limited Access
                </span>
                <h2 className="text-xl font-bold tracking-tight text-zinc-900 md:text-2xl">
                  Secure Your Free Access
                </h2>
                <p className="mt-2 text-sm text-zinc-600">
                  Register now to watch the full lecture instantly.
                </p>
                <div className="mt-6">
                  <Register1Form />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="border-b border-zinc-200 bg-white py-6">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-zinc-500">
            <a href="#accredited" className="hover:text-zinc-700">
              Accredited
            </a>
            <a href="#iso" className="hover:text-zinc-700">
              ISO Certified
            </a>
            <a href="#who" className="hover:text-zinc-700">
              WHO Standards
            </a>
            <a href="#healthcare" className="hover:text-zinc-700">
              Healthcare Int
            </a>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="bg-zinc-100/80 py-16 md:py-20">
        <div className="container">
          <h2 className="text-center text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl">
            Why Join the Yalla CPHQ Framework?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-600">
            Our comprehensive approach ensures you don&apos;t just pass an exam, but become a leader
            in healthcare quality.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/15 text-gold">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-zinc-900">Expert-Led Training</h3>
              <p className="mt-2 text-sm text-zinc-600">
                Learn from certified CPHQ practitioners with over 15 years of international
                healthcare experience.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/15 text-gold">
                <RefreshCw className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-zinc-900">2024 Curriculum</h3>
              <p className="mt-2 text-sm text-zinc-600">
                Stay ahead with content fully updated for the latest exam standards and healthcare
                regulations.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/15 text-gold">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-zinc-900">Flexible Learning</h3>
              <p className="mt-2 text-sm text-zinc-600">
                Access your lectures and study materials anytime, anywhere on any device at your own
                pace.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
