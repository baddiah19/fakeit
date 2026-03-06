import { memo, useMemo } from "react";
import Hotspot from "./Hotspot";
import { hotspots } from "@/data/hotspots";

type HotspotLayerProps = {
  imageWidth: number;
  imageHeight: number;
  panX: number;
  panY: number;
  activeHotspotId: string | null;
  onHotspotClick: (id: string) => void;
};

function HotspotLayer({
  imageWidth,
  imageHeight,
  panX,
  panY,
  activeHotspotId,
  onHotspotClick,
}: HotspotLayerProps) {
  const positions = useMemo(() => {
    if (!imageWidth || !imageHeight) {
      return [];
    }
    return hotspots.map((hotspot) => ({
      ...hotspot,
      screenX: hotspot.x * imageWidth + panX,
      screenY: hotspot.y * imageHeight + panY,
    }));
  }, [imageWidth, imageHeight, panX, panY]);

  return (
    <div className="pointer-events-none absolute inset-0">
      {positions.map((hotspot) => (
        <div key={hotspot.id} className="pointer-events-auto">
          <Hotspot
            title={hotspot.title}
            active={hotspot.id === activeHotspotId}
            position={{ x: hotspot.screenX, y: hotspot.screenY }}
            onClick={() => onHotspotClick(hotspot.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default memo(HotspotLayer);
