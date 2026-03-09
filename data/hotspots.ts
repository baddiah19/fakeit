/** Convert normalized image coords [0,1] to panorama yaw (degrees). */
export function xToYaw(x: number): number {
  return (x - 0.5) * 360;
}
/** Convert normalized image coords [0,1] to panorama pitch (degrees). */
export function yToPitch(y: number): number {
  return (0.5 - y) * 180;
}

/** Get pitch/yaw in degrees for a hotspot (uses explicit values or derives from x,y). */
export function getHotspotPitchYaw(h: Hotspot): { pitch: number; yaw: number } {
  return {
    pitch: h.pitch ?? yToPitch(h.y),
    yaw: h.yaw ?? xToYaw(h.x),
  };
}

export type Hotspot = {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
  /** Spherical: vertical angle in degrees (for 360 viewer). Derived from y if omitted. */
  pitch?: number;
  /** Spherical: horizontal angle in degrees (for 360 viewer). Derived from x if omitted. */
  yaw?: number;
  media?: string;
};

export const hotspots: Hotspot[] = [
  {
    id: "resume-ai",
    title: "Resume AI",
    description:
      "Resume AI",
    x: 0.05,
    y: 0.65,
    media: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  },
  {
    id: "interview-ai",
    title: "Interview AI",
    description:
      "Interview AI",
    x: 0.24,
    y: 0.6,
    media: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  },
  {
    id: "analytics-ai",
    title: "Analytics AI",
    description:
      "Analytics AI",
    x: 0.505,
    y: 0.59,
    media: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  },
  {
    id: "helpdesk-ai",
    title: "Helpdesk AI",
    description:
      "Helpdesk AI",
    x: 0.75,
    y: 0.58,
    media: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  },
  {
    id: "onboarding-ai",
    title: "Onboarding AI",
    description:
      "Onboarding AI",
    x: 0.87,
    y: 0.63,
    media: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  },
];

/** Hotspots for classroom 360 scene (add entries when you have a classroom panorama). */
export const classroomHotspots: Hotspot[] = [];

/** Hotspots for construction 360 scene (add entries when you have a construction panorama). */
export const constructionHotspots: Hotspot[] = [];
