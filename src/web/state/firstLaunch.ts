import { create } from "zustand";
import { persist } from "zustand/middleware";

type FirstLaunchState = {
  isFirstLaunch: boolean;
  hasLaunchedFirstTime: () => void;
};

export const useFirstLaunchState = create<FirstLaunchState>()(
  persist(
    (set) => ({
      isFirstLaunch: true,
      hasLaunchedFirstTime: () => set({ isFirstLaunch: true }),
    }),
    { name: "firstLaunchState" }
  )
);
