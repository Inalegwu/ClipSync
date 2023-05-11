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

      // const clipBoardText = clipboard.readText();
      // const clipBoardImage = clipboard.readImage();

      // const clipBoardData: Array<ClipBoardData> = [
      //   {
      //     data: clipBoardText,
      //     type: "TEXT",
      //   },
      //   {
      //     data: clipBoardImage,
      //     type: "IMAGE",
      //   },
      // ];

      return clipBoardData;
    },
    async appendTextToClipBoard(_, text: string) {
      clipboard.writeText(text, "clipboard");
    },
    async clearClipBoard() {
      clipboard.clear();
    },
    async readClipBoardImage() {
      const clipBoardImage = clipboard.readImage();

      return clipBoardImage;
    },
  },
});
