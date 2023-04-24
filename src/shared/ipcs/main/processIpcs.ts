import { app, clipboard } from "electron";
import { createIpcSlice } from "interprocess";
import path from "path";
import readClipBoard from "../../utils/readClipboard";
import db from "../../utils/db";

export const ProcessIpcs = createIpcSlice({
  main: {
    async readClipBoard() {
      // const clipBoardData = readClipBoard();
      // db.allDocs()
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      const clipBoardData = clipboard.readText();

      // const clipText = clipboard.readText();
      // const clipImage = clipboard.readImage();
      // const clipHTMl = clipboard.readHTML();
      // clipBoardData.push(clipImage);
      // clipBoardData.push(clipText);
      // clipBoardData.push(clipHTMl);

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
