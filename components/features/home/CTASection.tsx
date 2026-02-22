import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section id="enroll" className="bg-black py-16 md:py-24" aria-labelledby="cta-heading">
      <div className="container text-center">
        <h2 id="cta-heading" className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Ready to lead{" "}
          <span className="font-serif text-gold">Change?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-white/80">
          Take the next step in your healthcare quality journey. Enroll in a program today or
          download our free guide to get started.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold uppercase px-8 py-6"
          >
            <Link href="#enroll">Apply Today</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-gold text-white hover:bg-gold/10 hover:text-white font-semibold uppercase px-8 py-6"
          >
            <Link href="#guide">Download Free Guide</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
