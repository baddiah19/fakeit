"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SceneViewport from "@/components/SceneViewport";
import { classroomHotspots } from "@/data/hotspots";

/** Panorama 360° para Classroom. Mientras no tengas una imagen equirectangular propia, se reutiliza la de oficina. */
const CLASSROOM_PANORAMA = "/images/office-panorama.png";

function ClassroomContent() {
  const searchParams = useSearchParams();
  const debug = searchParams.get("debug") === "true";
  return (
    <SceneViewport
      debug={debug}
      imagePath={CLASSROOM_PANORAMA}
      hotspots={classroomHotspots}
    />
  );
}

export default function ClassroomPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
      <ClassroomContent />
    </Suspense>
  );
}
