import { app, clipboard } from "electron";
import { createIpcSlice } from "interprocess";
import * as fs from "fs";
import path from "path";

export const ProcessIpcs = createIpcSlice({
  main: {
    async readClipBoard() {
      const clipBoardData = clipboard.readText("clipboard");

      return clipBoardData;
    },
    async appendToClipBoard(_, text: string) {
      const clipDataPath = path.join(
        app.getPath("appData"),
        "/clipSync/clipData.json"
      );
      clipboard.writeText(text, "clipboard");
    },
    async removeFromClipBoard() {
      console.log("Removing");
    },
    async listenToClipBoardUpdates() {
      const clipBoardData = clipboard.readText("clipboard");

      return clipBoardData;
    },
  },
});
