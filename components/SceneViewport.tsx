"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { useGesture } from "@use-gesture/react";
import { animate } from "framer-motion";
import PanoramaStage from "./PanoramaStage";
import HotspotLayer from "./HotspotLayer";
import DemoPanel from "./DemoPanel";
import IntroModal from "./IntroModal";
import { hotspots } from "@/data/hotspots";
import { useSceneStore } from "@/store/useSceneStore";

type SceneViewportProps = {
  debug?: boolean;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function SceneViewport({ debug = false }: SceneViewportProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [cursorInfo, setCursorInfo] = useState({
    x: 0,
    y: 0,
    nx: 0,
    ny: 0,
  });

  const panX = useSceneStore((state) => state.panX);
  const panY = useSceneStore((state) => state.panY);
  const panelOpen = useSceneStore((state) => state.panelOpen);
  const activeHotspotId = useSceneStore((state) => state.activeHotspotId);
  const setActiveHotspot = useSceneStore((state) => state.setActiveHotspot);
  const openPanel = useSceneStore((state) => state.openPanel);
  const setPanPosition = useSceneStore((state) => state.setPanPosition);
  const setIsDragging = useSceneStore((state) => state.setIsDragging);

  const panRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    panRef.current = { x: panX, y: panY };
  }, [panX, panY]);

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) {
      return;
    }
    const update = () => {
      setViewportSize({
        width: element.clientWidth,
        height: element.clientHeight,
      });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const bounds = useMemo(() => {
    if (!imageSize.width || !imageSize.height) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }
    const totalX = Math.max(0, imageSize.width - viewportSize.width);
    const allowedX = totalX * 0.8;
    const minX = -allowedX;
    const maxX = 0;
    const minY = Math.min(0, viewportSize.height - imageSize.height);
    const maxY = 0;
    return { minX, maxX, minY, maxY };
  }, [imageSize, viewportSize]);

  const motionFactors = useMemo(() => {
    const rangeX = Math.max(1, Math.abs(bounds.minX - bounds.maxX));
    const rangeY = Math.max(1, Math.abs(bounds.minY - bounds.maxY));
    const nx = clamp((panX - bounds.minX) / rangeX, 0, 1) * 2 - 1;
    const ny = clamp((panY - bounds.minY) / rangeY, 0, 1) * 2 - 1;
    return {
      tiltX: -ny * 5.2,
      tiltY: nx * 7.5,
      driftX: nx * 22,
      driftY: ny * 16,
      depth: 18,
      vignetteShiftX: nx * 20,
      vignetteShiftY: ny * 16,
      highlightShiftX: nx * 26,
      highlightShiftY: ny * 20,
    };
  }, [bounds, panX, panY]);

  const updatePan = useCallback(
    (nextX: number, nextY: number) => {
      panRef.current = { x: nextX, y: nextY };
      setPanPosition(nextX, nextY);
    },
    [setPanPosition]
  );

  useGesture(
    {
      onDrag: ({
        first,
        last,
        movement: [mx, my],
        memo,
        velocity: [vx, vy],
        direction: [dx, dy],
      }) => {
        let start = memo as [number, number] | undefined;

        if (first || !start) {
          setIsDragging(true);
          animationRef.current?.stop();
          start = [panRef.current.x, panRef.current.y];
        }

        const nextX = clamp(start[0] + mx, bounds.minX, bounds.maxX);
        const nextY = clamp(start[1] + my, bounds.minY, bounds.maxY);
        updatePan(nextX, nextY);

        if (last) {
          setIsDragging(false);
          const inertia = 220;
          const targetX = clamp(
            nextX + vx * dx * inertia,
            bounds.minX,
            bounds.maxX
          );
          const targetY = clamp(
            nextY + vy * dy * inertia,
            bounds.minY,
            bounds.maxY
          );

          if (Math.abs(vx) > 0.05 || Math.abs(vy) > 0.05) {
            const controls = animate(0, 1, {
              type: "spring",
              stiffness: 120,
              damping: 24,
              duration: 0.6,
              onUpdate: (progress) => {
                const easedX = nextX + (targetX - nextX) * progress;
                const easedY = nextY + (targetY - nextY) * progress;
                updatePan(easedX, easedY);
              },
            });
            animationRef.current = controls;
          }
        }

        return start;
      },
    },
    {
      target: viewportRef,
      eventOptions: { passive: false },
    }
  );

  useEffect(() => {
    if (!activeHotspotId || !imageSize.width || !viewportSize.width) {
      return;
    }
    const hotspot = hotspots.find((spot) => spot.id === activeHotspotId);
    if (!hotspot) {
      return;
    }
    const targetX = clamp(
      viewportSize.width / 2 - hotspot.x * imageSize.width,
      bounds.minX,
      bounds.maxX
    );
    const targetY = clamp(
      viewportSize.height / 2 - hotspot.y * imageSize.height,
      bounds.minY,
      bounds.maxY
    );
    const startX = panRef.current.x;
    const startY = panRef.current.y;
    animationRef.current?.stop();
    const controls = animate(0, 1, {
      type: "spring",
      stiffness: 140,
      damping: 24,
      duration: 0.6,
      onUpdate: (progress) => {
        updatePan(
          startX + (targetX - startX) * progress,
          startY + (targetY - startY) * progress
        );
      },
    });
    animationRef.current = controls;
  }, [activeHotspotId, bounds, imageSize, updatePan, viewportSize]);

  const handleHotspotClick = (id: string) => {
    setActiveHotspot(id);
    openPanel();
  };

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
    if (!debug || !viewportRef.current || !imageSize.width) {
      return;
    }
    const rect = viewportRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const imgX = x - panRef.current.x;
    const imgY = y - panRef.current.y;
    const nx = clamp(imgX / imageSize.width, 0, 1);
    const ny = clamp(imgY / imageSize.height, 0, 1);
    setCursorInfo({ x, y, nx, ny });
  };

  const handleClick = () => {
    if (!debug) {
      return;
    }
    const { nx, ny } = cursorInfo;
    const rounded = {
      x: Number(nx.toFixed(3)),
      y: Number(ny.toFixed(3)),
    };
    console.log("Hotspot coordinates:", rounded);
  };

  return (
    <div
      ref={viewportRef}
      className="fixed inset-0 overflow-hidden bg-black"
      style={{ touchAction: "none" }}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
    >
      <div className="absolute inset-0 [perspective:900px]">
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(${motionFactors.driftX}px, ${motionFactors.driftY}px, ${motionFactors.depth}px) rotateX(${motionFactors.tiltX}deg) rotateY(${motionFactors.tiltY}deg)`,
            transition: "transform 80ms ease-out",
          }}
        >
          <PanoramaStage
            panX={panX}
            panY={panY}
            blur={panelOpen}
            onImageSize={(width, height) => setImageSize({ width, height })}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen"
            style={{
              transform: `translate3d(${panX * 0.1 + motionFactors.highlightShiftX}px, ${panY * 0.1 + motionFactors.highlightShiftY}px, 0)`,
              background:
                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.18), transparent 45%), radial-gradient(circle at 75% 60%, rgba(255,255,255,0.1), transparent 55%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              transform: `translate3d(${panX * -0.06}px, ${panY * -0.06}px, 0)`,
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.18), transparent 35%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12), transparent 45%)",
            }}
          />
        </div>
      </div>
      <HotspotLayer
        imageWidth={imageSize.width}
        imageHeight={imageSize.height}
        panX={panX}
        panY={panY}
        activeHotspotId={activeHotspotId}
        onHotspotClick={handleHotspotClick}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          transform: `translate3d(${motionFactors.vignetteShiftX}px, ${motionFactors.vignetteShiftY}px, 0)`,
          transition: "transform 120ms ease-out",
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0) 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      <IntroModal />
      <DemoPanel onNavigate={handleNavigate} />

      {debug && (
        <div className="pointer-events-none absolute left-6 top-6 z-20 rounded-xl border border-black/10 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-black/60">
          <div>Cursor {cursorInfo.x.toFixed(0)} , {cursorInfo.y.toFixed(0)}</div>
          <div>
            Normalized {cursorInfo.nx.toFixed(3)} , {cursorInfo.ny.toFixed(3)}
          </div>
        </div>
      )}
    </div>
  );
}
