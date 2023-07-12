import { ClipBoardItem } from "shared/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RemoteSyncState = {
  isOnline: boolean;
  deleted: string[];
  created: string[];
  appendCreated: (v: string) => void;
  appendDeleted: (v: string) => void;
  setIsOnline: (v: boolean) => void;
};

export const useRemoteSyncState = create<RemoteSyncState>()(
  persist(
    (set) => ({
      created: [],
      deleted: [],
      isOnline: false,
      appendCreated: (v) =>
        set(({ created }) => ({ created: [...created, v] })),
      appendDeleted: (v) =>
        set(({ deleted }) => ({ deleted: [...deleted, v] })),
      setIsOnline: (v) => set({ isOnline: v }),
    }),
    { name: "remoteSyncState" }
  )
);
