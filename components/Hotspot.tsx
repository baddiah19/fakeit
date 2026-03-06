type HotspotProps = {
  title: string;
  active: boolean;
  position: { x: number; y: number };
  onClick: () => void;
};

export default function Hotspot({
  title,
  active,
  position,
  onClick,
}: HotspotProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      style={{ left: position.x, top: position.y }}
      aria-label={title}
    >
      <span
        className={`absolute inline-flex h-7 w-7 rounded-full border transition ${
          active ? "border-white/90 bg-white/20" : "border-white/50 bg-white/10"
        }`}
      />
      <span
        className={`absolute inline-flex h-7 w-7 animate-pulse rounded-full ${
          active ? "bg-white/40" : "bg-white/20"
        }`}
      />
      <span className="relative h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
      <span className="pointer-events-none absolute left-1/2 top-full mt-3 w-max -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
        {title}
      </span>
    </button>
  );
}
