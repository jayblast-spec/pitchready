"use client";

import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import PitchForm from "./components/PitchForm";
import Footer from "./components/Footer";

export default function Home() {
  function scrollToPitch() {
    document.getElementById("pitch")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection onAnalyzeClick={scrollToPitch} />
      <FeaturesSection />
      <PitchForm />
      <Footer />
    </main>
  );
}
