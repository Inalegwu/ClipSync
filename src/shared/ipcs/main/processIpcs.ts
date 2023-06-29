import { clipboard } from "electron";
import { createIpcSlice } from "interprocess";

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
