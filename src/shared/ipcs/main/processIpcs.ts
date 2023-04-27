import { app, clipboard } from "electron";
import { createIpcSlice } from "interprocess";

/**
 *
 * CORE
 *
 * THIS IS WHERE ALL THE CLIPBOARD SHIT HAPPENS
 *
 */
export const ProcessIpcs = createIpcSlice({
  main: {
    async readClipBoard() {
      const clipBoardData = clipboard.readText();
      return clipBoardData;
    },
    async appendToClipBoard(_, text: string) {
      clipboard.writeText(text, "clipboard");
    },
  },
});
