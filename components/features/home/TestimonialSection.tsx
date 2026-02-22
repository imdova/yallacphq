"use client";

import { motion } from "motion/react";

export function TestimonialSection() {
  return (
    <section className="bg-white py-16 md:py-24" aria-label="Testimonial">
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="font-serif text-8xl leading-none text-gold/20"
            aria-hidden
          >
            &ldquo;
          </span>
          <motion.blockquote
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-xl italic text-zinc-600 md:text-2xl"
          >
            The CPHQ Preparation course at Yalla was the defining factor in my career. The
            methodological rigor of the curriculum made complex statistics intuitive.
          </motion.blockquote>
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-zinc-200" aria-hidden />
            <div>
              <p className="font-semibold text-zinc-900">Dr. Sarah Miller, CPHQ</p>
              <p className="text-sm text-zinc-500">Healthcare Quality Director</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
