import { create } from "zustand";
import type { ClipBoardItem, Row } from "../../shared/utils/types";

//TODO define type defintions for clipboard data from the res.rows in App.tsx
// else there is no more typesaftey

export interface ClipBoardState {
  clipBoardData: Array<ClipBoardItem>;
  setClipBoardData: (value: Array<any>) => void;
}

export const useClipBoard = create<ClipBoardState>((set) => ({
  clipBoardData: [],
  setClipBoardData: (value) => set(() => ({ clipBoardData: value })),
}));
