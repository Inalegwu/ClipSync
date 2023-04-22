import { create } from "zustand";

export interface ClipBoardState {
  clipBoardState: Array<string> | null;
  updateClipBoardState: (value: string) => void;
  clearClipBoardState: () => void;
}

export const useClipBoard = create<ClipBoardState>((set) => ({
  clipBoardState: [],
  updateClipBoardState: (value) =>
    set((state) => ({ clipBoardState: [...state.clipBoardState!, value] })),
  clearClipBoardState: () => set({ clipBoardState: [] }),
}));
