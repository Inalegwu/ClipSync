import { clipboard } from "electron";
import { createIpcSlice } from "interprocess";

export const ProcessIpcs = createIpcSlice({
  main: {
    async readClipBoard() {
      const clipBoardData = clipboard.readText("clipboard");

      return clipBoardData;
    },
  },
});
