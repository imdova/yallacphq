import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Register1Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded bg-gold text-gold-foreground font-bold text-sm">
            Y
          </span>
          <span className="text-lg font-semibold uppercase tracking-wide text-white">
            Yalla CPHQ
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium uppercase tracking-wide text-white/90 transition-colors hover:text-white"
          >
            Member Login
          </Link>
          <Button
            asChild
            className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold uppercase tracking-wide px-6"
          >
            <Link href="/#enroll">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
