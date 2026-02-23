"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreditCard,
  Building2,
  Lock,
  Info,
  Copy,
  Check,
  Shield,
  Mail,
  Instagram,
  Building,
  BadgeCheck,
} from "lucide-react";
import { ROUTES } from "@/constants";

const PRODUCT = {
  name: "CPHQ Mastery Bundle",
  subtitle: "Full Access + Exam Simulator",
  price: 499,
  reference: "CPHQ-ORDER-9921",
};

const BANK = {
  name: "Global Healthcare Bank",
  accountHolder: "Yalla CPHQ Learning LTD",
  iban: "AE84 0000 1234 5678 9012 345",
  swift: "GHB UAE 2X",
};

type PaymentMethod = "card" | "paypal" | "bank";

export function CheckoutView() {
  const [payment, setPayment] = React.useState<PaymentMethod>("bank");
  const [discountCode, setDiscountCode] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const copyIban = () => {
    void navigator.clipboard.writeText(BANK.iban);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white px-4 py-4 md:px-6">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gold text-gold-foreground font-bold">
              Y
            </span>
            <span className="font-semibold text-zinc-900">Yalla CPHQ</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-zinc-600">
            <Link href="/courses" className="hover:text-zinc-900">Courses</Link>
            <Link href="/courses" className="hover:text-zinc-900">Resources</Link>
            <Link href="/dashboard/support" className="hover:text-zinc-900">Support</Link>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-300 text-zinc-500 hover:bg-zinc-100"
              aria-label="Account or cart"
            >
              <span className="text-xs font-semibold">?</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="border-b border-zinc-200 bg-white px-4 py-3 md:px-6">
        <div className="container flex items-center gap-2 text-sm">
          <Link href="/" className="text-zinc-500 hover:text-zinc-900">Home</Link>
          <span className="text-zinc-300">/</span>
          <Link href={ROUTES.COURSE_DETAILS} className="text-zinc-500 hover:text-zinc-900">
            CPHQ Mastery Bundle
          </Link>
          <span className="text-zinc-300">/</span>
          <span className="font-medium text-gold">Checkout</span>
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 px-4 py-8 md:px-6 md:py-10">
        <div className="container grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
          {/* Left: Checkout form */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-zinc-900">Secure Checkout</h1>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold bg-gold/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
                <Lock className="h-3 w-3" />
                Encrypted
              </span>
            </div>
            <p className="mt-2 text-zinc-600">
              Complete your enrollment in the CPHQ Mastery Bundle. Your access will be granted
              immediately after payment.
            </p>

            <form
              className="mt-8 space-y-8"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* 1. Account Details */}
              <section>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-gold-foreground">
                    1
                  </span>
                  <h2 className="text-lg font-semibold text-zinc-900">Account Details</h2>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-zinc-700">Full Name</Label>
                    <Input
                      type="text"
                      defaultValue="John Doe"
                      className="h-11 rounded-lg border-zinc-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-zinc-700">Email Address</Label>
                    <Input
                      type="email"
                      defaultValue="john@example.com"
                      className="h-11 rounded-lg border-zinc-200"
                    />
                  </div>
                </div>
              </section>

              {/* 2. Payment Method */}
              <section>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-gold-foreground">
                    2
                  </span>
                  <h2 className="text-lg font-semibold text-zinc-900">Payment Method</h2>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setPayment("card")}
                    className={`flex items-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors ${
                      payment === "card"
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayment("paypal")}
                    className={`flex items-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors ${
                      payment === "paypal"
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
                    }`}
                  >
                    <span className="font-bold text-[#003087]">Pay</span>
                    <span className="font-bold text-[#009cde]">Pal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayment("bank")}
                    className={`flex items-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors ${
                      payment === "bank"
                        ? "border-gold bg-gold text-gold-foreground"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
                    }`}
                  >
                    <Building2 className="h-4 w-4" />
                    Bank Transfer
                  </button>
                </div>

                {payment === "bank" && (
                  <div className="mt-4 rounded-xl border-2 border-gold/40 bg-gold/5 p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                      <Info className="h-4 w-4 text-gold" />
                      Official Bank Account Details
                    </div>
                    <dl className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-zinc-500">BANK NAME</dt>
                        <dd className="font-medium text-zinc-900">{BANK.name}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-zinc-500">ACCOUNT HOLDER</dt>
                        <dd className="font-medium text-zinc-900">{BANK.accountHolder}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-zinc-500">IBAN</dt>
                        <dd className="flex items-center gap-2 font-medium text-zinc-900">
                          {BANK.iban}
                          <button
                            type="button"
                            onClick={copyIban}
                            className="rounded p-1 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-700"
                            aria-label="Copy IBAN"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-zinc-500">SWIFT / BIC</dt>
                        <dd className="font-medium text-zinc-900">{BANK.swift}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-zinc-500">REFERENCE</dt>
                        <dd className="font-medium text-zinc-900">{PRODUCT.reference}</dd>
                      </div>
                    </dl>
                    <p className="mt-4 text-xs text-zinc-500">
                      * Enrollment will be activated manually once the transfer is confirmed (usually
                      1–3 business days).
                    </p>
                  </div>
                )}
              </section>

              {/* 30-Day Guarantee */}
              <div className="rounded-xl border border-gold/30 bg-gold/10 p-4">
                <div className="flex gap-3">
                  <Check className="h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="font-semibold text-zinc-900">30-Day Money Back Guarantee</p>
                    <p className="mt-1 text-sm text-zinc-600">
                      If you&apos;re not satisfied, we&apos;ll refund your payment, no questions asked.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Right: Order summary sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-800 p-6 text-white shadow-lg">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded bg-gold text-gold-foreground">
                  Y
                </span>
                <span className="text-sm font-semibold uppercase tracking-wider">Yalla CPHQ</span>
              </div>
              <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider text-white/80">
                Order Summary
              </h2>
              <ul className="mt-4 space-y-3">
                <li>
                  <p className="font-medium text-white">{PRODUCT.name}</p>
                  <p className="text-sm text-white/60">{PRODUCT.subtitle}</p>
                  <p className="mt-1 text-gold">${PRODUCT.price.toFixed(2)}</p>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-white/70">Standard Platform Fee</span>
                  <span className="text-white/70">$0.00</span>
                </li>
              </ul>
              <div className="mt-6 flex gap-2">
                <Input
                  placeholder="Enter code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="h-10 flex-1 rounded-lg border-zinc-600 bg-zinc-700/50 text-white placeholder:text-white/50 focus-visible:ring-gold"
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="h-10 rounded-lg bg-zinc-600 text-white hover:bg-zinc-500"
                >
                  Apply
                </Button>
              </div>
              <p className="mt-2 text-xs text-white/50">Discount code</p>
              <div className="mt-6 flex items-center justify-between border-t border-zinc-600 pt-4">
                <span className="font-medium text-white">Total</span>
                <span className="text-2xl font-bold text-gold">${PRODUCT.price.toFixed(2)}</span>
              </div>
              <Button
                className="mt-6 h-12 w-full rounded-lg bg-gold text-gold-foreground hover:bg-gold/90 font-semibold uppercase tracking-wide"
                asChild
              >
                <Link href={ROUTES.DASHBOARD}>Complete Purchase</Link>
              </Button>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/60">
                <BadgeCheck className="h-4 w-4 text-gold" />
                Secure Checkout Gold Badge
              </div>
              <div className="mt-6 flex justify-center gap-6 border-t border-zinc-600 pt-4">
                <div className="flex flex-col items-center gap-1 text-center">
                  <Shield className="h-5 w-5 text-white/50" />
                  <span className="text-[10px] uppercase tracking-wider text-white/50">
                    SSL Secure
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <Lock className="h-5 w-5 text-white/50" />
                  <span className="text-[10px] uppercase tracking-wider text-white/50">
                    Private
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <BadgeCheck className="h-5 w-5 text-white/50" />
                  <span className="text-[10px] uppercase tracking-wider text-white/50">
                    Certified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white px-4 py-6 md:px-6">
        <div className="container flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gold text-gold-foreground font-bold text-sm">
              Y
            </span>
            <span className="text-sm font-semibold text-zinc-900">Yalla CPHQ</span>
          </div>
          <p className="text-xs text-zinc-500">© 2024 Yalla CPHQ. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-zinc-600 hover:text-zinc-900">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-zinc-600 hover:text-zinc-900">
              Terms of Service
            </Link>
            <Link href="/refund" className="text-xs text-zinc-600 hover:text-zinc-900">
              Refund Policy
            </Link>
            <div className="flex gap-3">
              <Mail className="h-4 w-4 text-zinc-400" aria-hidden />
              <Instagram className="h-4 w-4 text-zinc-400" aria-hidden />
              <Building className="h-4 w-4 text-zinc-400" aria-hidden />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
