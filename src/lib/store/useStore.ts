import { create } from "zustand";

interface FilterState {
  characterRace: string[];
  characterGender: string[];
  searchQuery: string;
  setCharacterRace: (races: string[]) => void;
  setCharacterGender: (genders: string[]) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  characterRace: [],
  characterGender: [],
  searchQuery: "",
  setCharacterRace: (races) => set({ characterRace: races }),
  setCharacterGender: (genders) => set({ characterGender: genders }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  resetFilters: () =>
    set({ characterRace: [], characterGender: [], searchQuery: "" }),
}));

interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
