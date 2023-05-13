import { app, clipboard } from "electron";
import { createIpcSlice } from "interprocess";
import { ClipBoardData } from "../../utils/types";

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
    async appendTextToClipBoard(_, text: string) {
      clipboard.writeText(text, "clipboard");
    },
    async clearClipBoard() {
      clipboard.clear();
    },
    async readClipBoardImage() {
      const clipBoardImage = clipboard.readImage("clipboard");

      // console.log(clipBoardImage.isEmpty());

      return clipBoardImage;
    },
    async appendImageToClipBoard(_, image: Electron.NativeImage) {
      clipboard.writeImage(image);
    },
  },
});
