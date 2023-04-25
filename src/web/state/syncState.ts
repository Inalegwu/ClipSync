import { create } from "zustand";

export type SyncFrequency =
  | "FREQUENTLY"
  | "DAILY"
  | "EVERY TWO DAYS"
  | "EVERY OTHER DAY";

export interface SyncStateProps {
  syncState: boolean;
  changeSyncState: (state: boolean) => void;
}

export const useSyncState = create<SyncStateProps>((set) => ({
  syncState: true,
  changeSyncState: (state) => set(() => ({ syncState: state })),
}));
