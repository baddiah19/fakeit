"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import ImageHotspot from "./ImageHotspot";
import type { HRHotspot } from "@/data/hrHotspots";

const PLACEHOLDER_HOTSPOT = {
  title: "Hotspot (editar en data/hrHotspots.ts)",
  description: "Descripción placeholder — reemplazar por el contenido correcto.",
};

type ImageWithHotspotsProps = {
  /** Image path (e.g. /images/office-panorama.png). */
  imageSrc: string;
  imageAlt: string;
  hotspots: HRHotspot[];
  /** Optional image fill mode. */
  objectFit?: "cover" | "contain";
};

export default function ImageWithHotspots({
  imageSrc,
  imageAlt,
  hotspots,
  objectFit = "cover",
}: ImageWithHotspotsProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  /** Hasta 5 coordenadas capturadas con clic derecho (x, y en % 0-100). */
  const [capturedPositions, setCapturedPositions] = useState<
    Array<{ x: number; y: number }>
  >([]);

  const activeHotspot = hotspots.find((h) => h.id === activeHotspotId) ?? null;
  const placeholderHotspots = capturedPositions.map((pos, i) => ({
    id: `captured-${i}`,
    title: PLACEHOLDER_HOTSPOT.title,
    description: PLACEHOLDER_HOTSPOT.description,
    x: Math.round(pos.x * 10) / 10,
    y: Math.round(pos.y * 10) / 10,
  }));
  const activePlaceholder = placeholderHotspots.find(
    (h) => h.id === activeHotspotId
  );

  const handleHotspotClick = useCallback((id: string) => {
    setActiveHotspotId((prev) => (prev === id ? null : id));
  }, []);

  const closeModal = useCallback(() => {
    setActiveHotspotId(null);
  }, []);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const el = overlayRef.current;
      if (!el || capturedPositions.length >= 5) {
        if (capturedPositions.length >= 5) {
          console.log(
            "[Hotspots] Ya tenés 5 coordenadas. Copiá el array de abajo a data/hrHotspots.ts y recargá sin captura."
          );
        }
        return;
      }
      const rect = el.getBoundingClientRect();
      const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
      const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
      const x = Math.round(xPercent * 10) / 10;
      const y = Math.round(yPercent * 10) / 10;
      const next = [...capturedPositions, { x, y }];
      setCapturedPositions(next);
      console.log(
        `[Hotspots] Clic derecho #${next.length}: x: ${x}, y: ${y} (porcentaje)`
      );
      console.log(
        "[Hotspots] Coordenadas para data/hrHotspots.ts (copiar los 5 cuando termines):",
        JSON.stringify(
          next.map((p, i) => ({ id: `hotspot-${i + 1}`, ...p })),
          null,
          2
        )
      );
    },
    [capturedPositions.length]
  );

  useEffect(() => {
    if (!activeHotspotId) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activeHotspotId, closeModal]);

  const hotspotsToRender =
    capturedPositions.length > 0 ? placeholderHotspots : hotspots;
  const activeContent = activePlaceholder ?? activeHotspot;

  return (
    <div className="relative w-full rounded-xl bg-black/5">
      {/* Image container: clip image to rounded area; overlay is sibling so hotspots are not clipped */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:aspect-[2/1]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className={objectFit === "cover" ? "object-cover" : "object-contain"}
          sizes="(max-width: 768px) 100vw, 90vw"
          quality={95}
          priority
        />
      </div>
      {/* Hotspot overlay: same size as image area, overflow-visible so edge hotspots are not clipped */}
      <div
        ref={overlayRef}
        className="absolute inset-0 overflow-visible"
        aria-hidden
        onContextMenu={handleContextMenu}
      >
        {hotspotsToRender.map((h) => (
          <ImageHotspot
            key={h.id}
            id={h.id}
            title={h.title}
            x={h.x}
            y={h.y}
            active={h.id === activeHotspotId}
            onClick={() => handleHotspotClick(h.id)}
          />
        ))}
      </div>
      {capturedPositions.length > 0 && (
        <p className="mt-2 text-center text-xs text-black/50">
          Clic derecho en la imagen: {capturedPositions.length}/5 coordenadas.
          Revisá la consola para copiar el JSON.
        </p>
      )}

      {/* Modal / popover for active hotspot */}
      {activeContent && (
        <>
          <div
            className="fixed inset-0 z-20 bg-black/40"
            onClick={closeModal}
            role="presentation"
            aria-hidden="true"
          />
          <div
            className="fixed left-1/2 top-1/2 z-30 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-black/10 bg-white p-6 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hotspot-modal-title"
            aria-describedby="hotspot-modal-desc"
          >
            <div className="flex items-start justify-between gap-4">
              <h2
                id="hotspot-modal-title"
                className="text-xl font-semibold text-[#1c1c1c]"
              >
                {activeContent.title}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full border border-black/10 px-3 py-1 text-xs uppercase tracking-wide text-black/60 transition hover:bg-black/5"
              >
                Close
              </button>
            </div>
            <p
              id="hotspot-modal-desc"
              className="mt-3 text-sm leading-6 text-black/70"
            >
              {activeContent.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
