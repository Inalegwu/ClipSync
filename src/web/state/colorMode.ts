import { create } from "zustand";

export type ColorMode = "Dark" | "Light";

export interface ColorModeState {
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
}

export const useColorModeValue = create<ColorModeState>((set) => ({
  colorMode: "Dark",
  setColorMode: (mode) => set(() => ({ colorMode: mode })),
}));
