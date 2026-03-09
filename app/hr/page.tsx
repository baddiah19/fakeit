"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SceneViewport from "@/components/SceneViewport";

function CafeContent() {
  const searchParams = useSearchParams();
  const debug = searchParams.get("debug") === "true";
  return <SceneViewport debug={debug} />;
}

export default function CafePage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
      <CafeContent />
    </Suspense>
  );
}
