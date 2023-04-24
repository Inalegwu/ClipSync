import { create } from "zustand";

export interface PrimaryColorState {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
}

export const usePrimaryColor = create<PrimaryColorState>((set) => ({
  primaryColor: "#246a50",
  setPrimaryColor: (color) => set(() => ({ primaryColor: color })),
}));
