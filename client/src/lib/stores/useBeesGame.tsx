import { create } from "zustand";
import { persist } from "zustand/middleware";

export type GameView = "menu" | "section" | "villages" | "minigame";

interface BeesGameState {
  currentView: GameView;
  currentSectionId: string | null;
  completedSections: Set<string>;
  gameProgress: number;
  soundEnabled: boolean;
  
  // Actions
  setCurrentView: (view: GameView) => void;
  setCurrentSection: (sectionId: string | null) => void;
  completeSection: (sectionId: string) => void;
  toggleSound: () => void;
  resetProgress: () => void;
  calculateProgress: () => void;
}

export const useBeesGame = create<BeesGameState>()(
  persist(
    (set, get) => ({
      currentView: "menu",
      currentSectionId: null,
      completedSections: new Set(),
      gameProgress: 0,
      soundEnabled: true,

      setCurrentView: (view) => set({ currentView: view }),
      
      setCurrentSection: (sectionId) => set({ currentSectionId: sectionId }),
      
      completeSection: (sectionId) => {
        const { completedSections } = get();
        const newCompleted = new Set(completedSections);
        newCompleted.add(sectionId);
        set({ completedSections: newCompleted });
        get().calculateProgress();
      },
      
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      
      resetProgress: () => set({
        completedSections: new Set(),
        gameProgress: 0,
        currentView: "menu",
        currentSectionId: null
      }),
      
      calculateProgress: () => {
        const { completedSections } = get();
        const totalSections = 4; // intro, pillars, stages, villages
        const progress = Math.round((completedSections.size / totalSections) * 100);
        set({ gameProgress: progress });
      }
    }),
    {
      name: "bees-game-storage",
      partialize: (state) => ({
        completedSections: Array.from(state.completedSections),
        gameProgress: state.gameProgress,
        soundEnabled: state.soundEnabled
      }),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
        completedSections: new Set(persistedState?.completedSections || [])
      })
    }
  )
);
