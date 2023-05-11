import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdvanceModeState {
  isAdvanceMode: boolean;
  setAdvanceMode: (value: boolean) => void;
}

export const useAdvanceMode = create<AdvanceModeState>()(
  persist(
    (set) => ({
      isAdvanceMode: true,
      setAdvanceMode: (value) => set(() => ({ isAdvanceMode: value })),
    }),
    { name: "advanceMode" }
  )
);
