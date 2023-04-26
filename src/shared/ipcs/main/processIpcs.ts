import { app, clipboard } from "electron";
import { createIpcSlice } from "interprocess";
import db from "../../utils/db";

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
