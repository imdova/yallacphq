"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Send,
} from "lucide-react";

const accounts = [
  { href: "/dashboard", label: "Login" },
  { href: "#register", label: "Register" },
  { href: "#orders", label: "Order Status" },
  { href: "#account", label: "Manage Account" },
];

const resources = [
  { href: "#quote", label: "Get a Quote" },
  { href: "#support", label: "Support" },
  { href: "#privacy", label: "Privacy Policy" },
  { href: "#terms", label: "Terms & Conditions" },
];

const social = [
  { href: "#", icon: Linkedin },
  { href: "#", icon: Instagram },
  { href: "#", icon: Facebook },
  { href: "#", icon: Youtube },
];

export function HomeFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <p className="text-lg font-semibold uppercase tracking-wide">Yalla CPHQ</p>
            <p className="text-sm text-white/70">
              Healthcare quality education and CPHQ certification preparation for professionals
              worldwide.
            </p>
            <div className="flex gap-4">
              {social.map(({ href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  className="text-white/60 transition-colors hover:text-white"
                  aria-label={Icon.name}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">
              Accounts
            </h3>
            <ul className="mt-4 space-y-2">
              {accounts.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              {resources.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">
              Contact Us
            </h3>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Email Address"
                className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus-visible:ring-gold"
              />
              <Button
                type="submit"
                size="icon"
                className="shrink-0 bg-gold text-gold-foreground hover:bg-gold/90"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/60 md:flex-row">
          <p>© 2026 Yalla CPHQ. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="#cookies" className="hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
