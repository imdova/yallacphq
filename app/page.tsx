import {
  HomeHeader,
  Hero,
  ProgramsSection,
  ElevatingSection,
  TestimonialSection,
  CTASection,
  HomeFooter,
} from "@/components/features/home";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <HomeHeader />
      <main>
        <Hero />
        <ProgramsSection />
        <ElevatingSection />
        <TestimonialSection />
        <CTASection />
        <HomeFooter />
      </main>
    </div>
  );
}
