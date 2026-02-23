"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Eye, EyeOff, Shield } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gold text-gold-foreground font-bold">
            Y
          </span>
          <span className="font-semibold text-zinc-900">Yalla CPHQ</span>
        </Link>
        <nav className="flex gap-6 text-sm font-medium text-zinc-600">
          <Link href="/courses" className="hover:text-zinc-900">Resources</Link>
          <Link href="/dashboard/support" className="hover:text-zinc-900">Support</Link>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="flex justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold text-gold-foreground">
              <Shield className="h-7 w-7" />
            </span>
          </div>
          <h1 className="mt-6 text-center text-2xl font-bold text-zinc-900">Welcome Back</h1>
          <p className="mt-1 text-center text-zinc-600">Access your healthcare quality dashboard</p>

          <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-zinc-700">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <Input
                  type="email"
                  placeholder="name@organization.com"
                  className="h-11 pl-10 rounded-lg border-zinc-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-zinc-700">Password</Label>
                <Link href="/forgot-password" className="text-sm font-medium text-gold hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-11 pl-10 pr-10 rounded-lg border-zinc-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="keep" />
              <Label htmlFor="keep" className="text-sm text-zinc-600 cursor-pointer">
                Keep me logged in
              </Label>
            </div>
            <Button type="submit" className="h-11 w-full rounded-lg bg-gold text-gold-foreground hover:bg-gold/90 font-semibold gap-2">
              Login to Dashboard
              <span aria-hidden>→</span>
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-gold hover:underline">
              Sign up
            </Link>
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-zinc-50 py-2 text-xs font-medium text-zinc-500">
            <Lock className="h-3.5 w-3.5" />
            Secure login environment
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-zinc-500">
        © 2024 Yalla CPHQ. Certified Professional in Healthcare Quality. All rights reserved.
      </footer>
    </div>
  );
}
