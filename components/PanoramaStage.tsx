"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type PanoramaStageProps = {
  panX: number;
  panY: number;
  blur: boolean;
  onImageSize: (width: number, height: number) => void;
};

export default function PanoramaStage({
  panX,
  panY,
  blur,
  onImageSize,
}: PanoramaStageProps) {
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(
    null
  );

  useEffect(() => {
    if (!imageElement) {
      return;
    }

    const update = () => {
      onImageSize(imageElement.clientWidth, imageElement.clientHeight);
    };

    update();

    const observer = new ResizeObserver(() => update());
    observer.observe(imageElement);

    return () => observer.disconnect();
  }, [imageElement, onImageSize]);

  return (
    <div className="absolute inset-0">
      <Image
        src="/images/office-panorama.png"
        alt="Panoramic cafe scene"
        width={4000}
        height={2000}
        draggable={false}
        quality={100}
        className="h-full w-auto min-w-[190vw] select-none will-change-transform"
        onLoadingComplete={(img) => setImageElement(img)}
        style={{
          transform: `translate3d(${panX}px, ${panY}px, 0) scale(1.05)`,
          filter: blur ? "blur(0.7px)" : "none",
          transition: blur ? "filter 200ms ease" : "none",
        }}
      />
    </div>
  );
}
