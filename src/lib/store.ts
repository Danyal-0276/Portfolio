import { create } from 'zustand';

interface PortfolioState {
  activeSection: number;
  scrollProgress: number;
  isLoaded: boolean;
  
  setActiveSection: (section: number) => void;
  setScrollProgress: (progress: number) => void;
  setIsLoaded: (loaded: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeSection: 0,
  scrollProgress: 0,
  isLoaded: false,

  setActiveSection: (section) => set({ activeSection: section }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
}));
