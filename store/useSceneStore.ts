import { create } from "zustand";

type SceneState = {
  activeHotspotId: string | null;
  panelOpen: boolean;
  panX: number;
  panY: number;
  isDragging: boolean;
};

type SceneActions = {
  setActiveHotspot: (id: string | null) => void;
  openPanel: () => void;
  closePanel: () => void;
  setPanPosition: (panX: number, panY: number) => void;
  setIsDragging: (value: boolean) => void;
};

export const useSceneStore = create<SceneState & SceneActions>((set) => ({
  activeHotspotId: null,
  panelOpen: false,
  panX: 0,
  panY: 0,
  isDragging: false,
  setActiveHotspot: (id) => set({ activeHotspotId: id }),
  openPanel: () => set({ panelOpen: true }),
  closePanel: () => set({ panelOpen: false }),
  setPanPosition: (panX, panY) => set({ panX, panY }),
  setIsDragging: (value) => set({ isDragging: value }),
}));
