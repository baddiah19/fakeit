"use client";

import { useSearchParams } from "next/navigation";
import SceneViewport from "@/components/SceneViewport";

export default function CafePage() {
  const searchParams = useSearchParams();
  const debug = searchParams.get("debug") === "true";

  return <SceneViewport debug={debug} />;
}
