"use client";

import { useRef } from "react";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import PitchForm from "./components/PitchForm";
import Footer from "./components/Footer";

export default function Home() {
  const pitchRef = useRef<HTMLDivElement>(null);

  function scrollToPitch() {
    pitchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <HeroSection onAnalyzeClick={scrollToPitch} />
      <FeaturesSection />
      <div ref={pitchRef} className="scroll-mt-8 pt-8">
        <div className="mx-auto max-w-3xl px-4 mb-10">
          <h2 className="text-xl font-bold text-foreground">Analyze your startup idea</h2>
          <p className="text-sm text-muted mt-1">
            Describe what you&apos;re building, who it&apos;s for, and how you make money. The more detail, the sharper the analysis.
          </p>
        </div>
        <PitchForm />
      </div>
      <Footer />
    </main>
  );
}
