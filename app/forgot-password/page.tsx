"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gold text-gold-foreground font-bold">
            Y
          </span>
          <span className="font-semibold text-zinc-900">Yalla CPHQ</span>
        </Link>
        <span className="text-sm text-zinc-500">Healthcare Quality Portal</span>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-zinc-900">Reset your password</h1>
          <p className="mt-2 text-zinc-600">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>

          {submitted ? (
            <div className="mt-8 rounded-lg bg-gold/10 border border-gold/30 p-4 text-sm text-zinc-700">
              <p className="font-medium text-gold">Check your email</p>
              <p className="mt-1">
                If an account exists for that address, we&apos;ve sent a password reset link.
                The link will expire in 24 hours.
              </p>
              <Link href="/login" className="mt-4 inline-block font-medium text-gold hover:underline">
                Return to login
              </Link>
            </div>
          ) : (
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-zinc-700">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="name@organization.com"
                    className="h-11 pl-10 rounded-lg border-zinc-200"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="h-11 w-full rounded-lg bg-gold text-gold-foreground hover:bg-gold/90 font-semibold gap-2">
                Send reset link
                <span aria-hidden>→</span>
              </Button>
            </form>
          )}
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-zinc-500">
        © 2024 Yalla CPHQ. All rights reserved.
      </footer>
    </div>
  );
}
