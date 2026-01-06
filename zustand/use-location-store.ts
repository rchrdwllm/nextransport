import { create } from "zustand";

interface LocationInitialState {
  lat: number | null;
  lng: number | null;
  setLocation: (lat: number, lng: number) => void;
}

export const useLocationStore = create<LocationInitialState>((set) => ({
  lat: null,
  lng: null,
  setLocation: (lat, lng) => set({ lat, lng }),
}));
