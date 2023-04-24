import { create } from "zustand";

export type SyncFrequency =
  | "FREQUENTLY"
  | "DAILY"
  | "EVERY TWO DAYS"
  | "EVERY OTHER DAY";

export interface SyncStateProps {
  syncState: boolean;
  syncFrequency: SyncFrequency;
  changeSyncFrequency: (frequency: SyncFrequency) => void;
  changeSyncState: (state: boolean) => void;
}

export const useSyncState = create<SyncStateProps>((set) => ({
  syncState: true,
  syncFrequency: "DAILY",
  changeSyncFrequency: (freq) => set(() => ({ syncFrequency: freq })),
  changeSyncState: (state) => set(() => ({ syncState: state })),
}));
