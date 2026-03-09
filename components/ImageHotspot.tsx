"use client";

type ImageHotspotProps = {
  id: string;
  title: string;
  /** Horizontal position as percentage (0–100). */
  x: number;
  /** Vertical position as percentage (0–100). */
  y: number;
  active: boolean;
  onClick: () => void;
};

export default function ImageHotspot({
  title,
  x,
  y,
  active,
  onClick,
}: ImageHotspotProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-label={title}
    >
      <span
        className={`image-hotspot-ring absolute inline-flex h-8 w-8 rounded-full border-2 transition ${
          active
            ? "border-white bg-white/30"
            : "border-white/80 bg-white/15 hover:border-white hover:bg-white/25"
        }`}
      />
      <span
        className={`absolute inline-flex h-8 w-8 rounded-full ${
          active ? "animate-pulse bg-white/50" : "bg-white/20 group-hover:bg-white/30"
        }`}
      />
      <span className="relative h-3 w-3 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
      {/* Hover tooltip */}
      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 w-max max-w-[200px] -translate-x-1/2 rounded-lg bg-black/85 px-3 py-2 text-left text-xs font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100">
        {title}
      </span>
    </button>
  );
}
