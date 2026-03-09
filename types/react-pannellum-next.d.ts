declare module "react-pannellum-next" {
  import type { ComponentType } from "react";

  export interface HotspotProps {
    pitch: number;
    yaw: number;
    type?: string;
    text?: string;
    cssClass?: string;
    onClick?: (e: unknown, args: unknown) => void;
    clickHandlerArgs?: unknown;
  }

  export interface PanoramaViewerProps {
    imagePath: string;
    hotSpots?: HotspotProps[];
    autoLoad?: boolean;
    autoRotate?: number;
    compass?: boolean;
    showControls?: boolean;
    width?: string;
    height?: string;
    hotSpotDebug?: boolean;
    /** Initial horizontal field of view in degrees (default 100). Lower = more zoomed in = sharper when source resolution is limited. */
    initialHfov?: number;
    /** Called when the viewer is ready; use viewer.lookAt(pitch, yaw, undefined, durationMs) for smooth scroll to a hotspot. */
    onViewerReady?: (viewer: { lookAt: (...args: unknown[]) => void }) => void;
  }

  export const PanoramaViewer: ComponentType<PanoramaViewerProps>;
}
