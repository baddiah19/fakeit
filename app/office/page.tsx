"use client";

import ImageWithHotspots from "@/components/ImageWithHotspots";
import { hrHotspots } from "@/data/hrHotspots";

export default function OfficePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8ebf5] to-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-[#1c1c1c] sm:text-4xl">
            HR Office
          </h1>
          <p className="mt-2 text-black/60">
            Click the hotspots to explore AI features in the scene.
          </p>
        </header>
        <ImageWithHotspots
          imageSrc="/images/office-panorama.png"
          imageAlt="HR office scene with AI feature hotspots"
          hotspots={hrHotspots}
          objectFit="cover"
        />
      </div>
    </div>
  );
}
