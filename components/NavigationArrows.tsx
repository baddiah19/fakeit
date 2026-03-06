type NavigationArrowsProps = {
  onPrev: () => void;
  onNext: () => void;
};

export default function NavigationArrows({
  onPrev,
  onNext,
}: NavigationArrowsProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onPrev}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black/60 transition hover:bg-black/5"
        aria-label="Previous hotspot"
      >
        ←
      </button>
      <button
        type="button"
        onClick={onNext}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black/60 transition hover:bg-black/5"
        aria-label="Next hotspot"
      >
        →
      </button>
    </div>
  );
}
