"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

const SPECIALTIES = [
  "Physician",
  "Nurse",
  "Quality Manager",
  "Healthcare Administrator",
  "Pharmacist",
  "Other",
];

export function Register1Form() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [specialty, setSpecialty] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: would submit to API
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
          Full Name
        </Label>
        <Input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-11 rounded-lg border-zinc-300 bg-zinc-50"
          required
        />
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
          Email Address
        </Label>
        <Input
          type="email"
          placeholder="email@healthcare.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 rounded-lg border-zinc-300 bg-zinc-50"
          required
        />
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
          Healthcare Specialty
        </Label>
        <Select value={specialty} onValueChange={setSpecialty} required>
          <SelectTrigger className="h-11 rounded-lg border-zinc-300 bg-zinc-50">
            <SelectValue placeholder="Select your specialty" />
          </SelectTrigger>
          <SelectContent>
            {SPECIALTIES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        type="submit"
        className="h-12 w-full bg-gold text-gold-foreground hover:bg-gold/90 font-semibold uppercase tracking-wide gap-2"
      >
        Watch Free Lecture Now
        <ArrowRight className="h-4 w-4" />
      </Button>
      <p className="text-center text-xs text-zinc-400">
        We value your privacy. Your data is encrypted & secure.
      </p>
    </form>
  );
}
