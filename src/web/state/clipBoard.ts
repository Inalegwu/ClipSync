import { create } from "zustand";
import { ClipBoardItem } from "../../shared/utils/types";

export interface ClipBoardState {
  clipBoardData: Array<ClipBoardItem>;
  setClipBoardData: (value: ClipBoardItem) => void;
  deleteClipBoardItem: (id: string) => void;
}

export const useClipBoard = create<ClipBoardState>((set) => ({
  clipBoardData: [],
  setClipBoardData: (value) =>
    set((state) => ({ clipBoardData: [...state.clipBoardData, value] })),
  deleteClipBoardItem: (id: string) =>
    set((state) => ({
      clipBoardData: state.clipBoardData.filter((value) => value.id !== id),
    })),
}));
