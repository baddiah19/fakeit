export type Hotspot = {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
  media?: string;
};

export const hotspots: Hotspot[] = [
  {
    id: "ai-camera",
    title: "AI Predicting Foot Traffic",
    description:
      "Computer vision forecasts peak times, optimizing staffing and queue flow.",
    x: 0.12,
    y: 0.32,
    media: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  },
  {
    id: "smart-audio",
    title: "Sound Levels Insight",
    description:
      "Ambient audio analytics keep the cafe comfortable and reduce noise spikes.",
    x: 0.44,
    y: 0.36,
    media: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  },
  {
    id: "predictive-pos",
    title: "Predictive Ordering",
    description:
      "The POS recommends add-ons and bundles based on real-time demand.",
    x: 0.51,
    y: 0.46,
    media: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  },
  {
    id: "qr-ordering",
    title: "Smart QR Ordering",
    description:
      "Personalized QR menus speed ordering and adapt to inventory changes.",
    x: 0.76,
    y: 0.54,
    media: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  },
  {
    id: "menu-optimization",
    title: "Menu Board Optimization",
    description:
      "AI adjusts featured items to maximize margin and customer satisfaction.",
    x: 0.65,
    y: 0.18,
    media: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  },
];
