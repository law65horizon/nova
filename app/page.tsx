import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import MenuHighlights from "@/components/home/MenuHighlights";
import FamilyPackageSection from "@/components/home/FamilyPackageSection";
import LiveMusicSection from "@/components/home/LiveMusicSection";
import GalleryTeaser from "@/components/home/GalleryTeaser";
import LocationStrip from "@/components/home/LocationStrip";

export const metadata: Metadata = {
  title: "Nova Restaurant & Bar | Asaba's Upscale Dining Destination",
  description:
    "Contemporary cuisine, premium cocktails, and live music every weekend. Located at 84 Okpanam Road, GRA Phase I, Asaba — opposite the Legislative Quarters.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <MenuHighlights />
      <FamilyPackageSection />
      <LiveMusicSection />
      <GalleryTeaser />
      <LocationStrip />
    </>
  );
}
