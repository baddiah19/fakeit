"use client";

import { useState } from "react";

export default function IntroModal() {
  const [open, setOpen] = useState(true);

  if (!open) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute left-1/2 top-8 z-20 w-[92vw] max-w-md -translate-x-1/2 rounded-2xl border border-black/10 bg-white/90 p-4 text-[#1c1c1c] shadow-[0px_20px_60px_rgba(16,24,40,0.18)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-black/50">
            Welcome
          </p>
          <h3 className="mt-2 text-lg font-semibold">Explore the cafe</h3>
          <p className="mt-2 text-sm text-black/60">
            Drag to look around. Tap hotspots to open AI feature demos.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="pointer-events-auto rounded-full border border-black/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-black/60 transition hover:bg-black/5"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
