import { app, clipboard } from "electron";
import { createIpcSlice } from "interprocess";
import { ClipBoardImage, ClipBoardText } from "../../utils/types";

/**
 *
 * CORE
 *
 * THIS IS WHERE ALL THE CLIPBOARD SHIT HAPPENS
 *
 */
export const ProcessIpcs = createIpcSlice({
  main: {
    async readClipBoardText() {
      const clipBoardData = clipboard.readText();
      return clipBoardData;
    },
    async appendToClipBoard(_, text: string) {
      clipboard.writeText(text, "clipboard");
    },
    async clearClipBoard() {
      clipboard.clear();
    },
    async readClipBoardImage() {
      const clipBoardData = clipboard.readImage("clipboard");
      // console.log(clipBoardData);
      return clipBoardData;
    },
  },
});
