"use client";

import { useRef, useState, useEffect } from "react";
import type { PointerEvent } from "react";
import Panorama360View from "./Panorama360View";
import DemoPanel from "./DemoPanel";
import IntroModal from "./IntroModal";
import { hotspots as defaultHotspots } from "@/data/hotspots";
import type { Hotspot } from "@/data/hotspots";
import { useSceneStore } from "@/store/useSceneStore";

type SceneViewportProps = {
  debug?: boolean;
  /** Panorama image path (equirectangular). Default: /images/office-panorama.png */
  imagePath?: string;
  /** Hotspots for this scene. Default: HR office hotspots. */
  hotspots?: Hotspot[];
};

export default function SceneViewport({
  debug = false,
  imagePath,
  hotspots = defaultHotspots,
}: SceneViewportProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [cursorInfo, setCursorInfo] = useState({
    x: 0,
    y: 0,
  });

  const activeHotspotId = useSceneStore((state) => state.activeHotspotId);
  const setActiveHotspot = useSceneStore((state) => state.setActiveHotspot);
  const openPanel = useSceneStore((state) => state.openPanel);
  const closePanel = useSceneStore((state) => state.closePanel);

  useEffect(() => {
    if (hotspots.length === 0) closePanel();
  }, [hotspots.length, closePanel]);

  const handleNavigate = (direction: "prev" | "next") => {
    if (!hotspots.length) {
      return;
    }
    const currentIndex = hotspots.findIndex(
      (spot) => spot.id === activeHotspotId
    );
    const nextIndex =
      direction === "next"
        ? (currentIndex + 1 + hotspots.length) % hotspots.length
        : (currentIndex - 1 + hotspots.length) % hotspots.length;
    const nextSpot = hotspots[nextIndex];
    setActiveHotspot(nextSpot.id);
    openPanel();
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!debug || !viewportRef.current) {
      return;
    }
    const rect = viewportRef.current.getBoundingClientRect();
    setCursorInfo({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <div
      ref={viewportRef}
      className="fixed inset-0 overflow-hidden bg-black"
      style={{ touchAction: "none" }}
      onPointerMove={handlePointerMove}
    >
      <Panorama360View imagePath={imagePath} hotspots={hotspots} />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0) 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      <IntroModal />
      <DemoPanel hotspots={hotspots} onNavigate={handleNavigate} />

      {debug && (
        <div className="pointer-events-none absolute left-6 top-6 z-20 rounded-xl border border-black/10 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-black/60">
          <div>Cursor {cursorInfo.x.toFixed(0)} , {cursorInfo.y.toFixed(0)}</div>
          <div>360° mode</div>
        </div>
      )}
    </div>
  );
}
