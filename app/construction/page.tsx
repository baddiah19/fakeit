"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SceneViewport from "@/components/SceneViewport";
import { constructionHotspots } from "@/data/hotspots";

/** Panorama 360° para Construction. Mientras no tengas una imagen equirectangular propia, se reutiliza la de oficina. */
const CONSTRUCTION_PANORAMA = "/images/office-panorama.png";

function ConstructionContent() {
  const searchParams = useSearchParams();
  const debug = searchParams.get("debug") === "true";
  return (
    <SceneViewport
      debug={debug}
      imagePath={CONSTRUCTION_PANORAMA}
      hotspots={constructionHotspots}
    />
  );
}

export default function ConstructionPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
      <ConstructionContent />
    </Suspense>
  );
}
