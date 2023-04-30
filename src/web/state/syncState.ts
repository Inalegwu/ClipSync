import { create } from "zustand";

export type SyncFrequency =
  | "FREQUENTLY"
  | "DAILY"
  | "EVERY TWO DAYS"
  | "EVERY OTHER DAY";

export interface SyncStateProps {
  canSync: boolean;
  syncUrl: string;
  changeSyncState: (state: boolean) => void;
  setSyncUrl: (url: string) => void;
}

export const useSyncState = create<SyncStateProps>((set) => ({
  canSync: true,
  syncUrl: "http://admin:admin@localhost:5984/clipboards",
  changeSyncState: (state) => set(() => ({ canSync: state })),
  setSyncUrl: (url: string) => set(() => ({ syncUrl: url })),
}));
