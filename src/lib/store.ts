import { create } from 'zustand';

export type DeviceTier = 'high' | 'mid' | 'low';

interface PortfolioState {
  activeChapter: number;
  scrollProgress: number;
  deviceTier: DeviceTier;
  hoveredProjectId: string | null;
  reducedMotion: boolean;
  isLoaded: boolean;
  use3D: boolean;

  setActiveChapter: (chapter: number) => void;
  setScrollProgress: (progress: number) => void;
  setDeviceTier: (tier: DeviceTier) => void;
  setHoveredProjectId: (id: string | null) => void;
  setReducedMotion: (value: boolean) => void;
  setIsLoaded: (loaded: boolean) => void;
  setUse3D: (value: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeChapter: 0,
  scrollProgress: 0,
  deviceTier: 'mid',
  hoveredProjectId: null,
  reducedMotion: false,
  isLoaded: false,
  use3D: true,

  setActiveChapter: (chapter) => set({ activeChapter: chapter }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setDeviceTier: (tier) => set({ deviceTier: tier }),
  setHoveredProjectId: (id) => set({ hoveredProjectId: id }),
  setReducedMotion: (value) => set({ reducedMotion: value }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  setUse3D: (value) => set({ use3D: value }),
}));
