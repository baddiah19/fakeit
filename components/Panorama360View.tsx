"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useRef, useEffect } from "react";
import { getHotspotPitchYaw } from "@/data/hotspots";
import type { Hotspot } from "@/data/hotspots";
import { useSceneStore } from "@/store/useSceneStore";

import "react-pannellum-next/dist/index.css";

const PanoramaViewer = dynamic(
  () => import("react-pannellum-next").then((mod) => mod.PanoramaViewer),
  { ssr: false }
);

const DEFAULT_PANORAMA_IMAGE = "/images/office-panorama.png";

const LOOKAT_DURATION_MS = 800;
/** Slightly narrower FOV = more zoomed in = uses more pixels from the texture (less pixelation when source res is limited). Default Pannellum is 100. */
const INITIAL_HFOV = 85;

type Panorama360ViewProps = {
  imagePath?: string;
  hotspots?: Hotspot[];
};

export default function Panorama360View({
  imagePath = DEFAULT_PANORAMA_IMAGE,
  hotspots = [],
}: Panorama360ViewProps) {
  const viewerRef = useRef<{ lookAt: (...args: unknown[]) => void } | null>(
    null
  );
  const setActiveHotspot = useSceneStore((state) => state.setActiveHotspot);
  const openPanel = useSceneStore((state) => state.openPanel);
  const activeHotspotId = useSceneStore((state) => state.activeHotspotId);

  const handleViewerReady = useCallback(
    (viewer: { lookAt: (...args: unknown[]) => void }) => {
      viewerRef.current = viewer;
    },
    []
  );

  const prevActiveIdRef = useRef<string | null>(null);
  useEffect(() => {
    if (!activeHotspotId || !viewerRef.current || !hotspots.length) return;
    if (prevActiveIdRef.current === activeHotspotId) return;
    prevActiveIdRef.current = activeHotspotId;
    const spot = hotspots.find((h) => h.id === activeHotspotId);
    if (!spot) return;
    const { pitch, yaw } = getHotspotPitchYaw(spot);
    viewerRef.current.lookAt(pitch, yaw, undefined, LOOKAT_DURATION_MS);
  }, [activeHotspotId, hotspots]);

  const handleHotspotClick = useCallback(
    (_e: unknown, args: unknown) => {
      const id = args as string;
      setActiveHotspot(id);
      openPanel();
    },
    [setActiveHotspot, openPanel]
  );

  const pannellumHotSpots = useMemo(
    () =>
      hotspots.map((h) => {
        const { pitch, yaw } = getHotspotPitchYaw(h);
        return {
          pitch,
          yaw,
          type: "info" as const,
          text: h.title,
          cssClass: "fakeit-hotspot",
          onClick: handleHotspotClick,
          clickHandlerArgs: h.id,
        };
      }),
    [handleHotspotClick, hotspots]
  );

  return (
    <div className="absolute inset-0">
      <PanoramaViewer
        imagePath={imagePath}
        hotSpots={pannellumHotSpots}
        autoLoad
        initialHfov={INITIAL_HFOV}
        width="100%"
        height="100%"
        onViewerReady={handleViewerReady}
      />
    </div>
  );
}
