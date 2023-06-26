import { shell } from "electron";
import { createIpcSlice } from "interprocess";

export const ExternalIpcs = createIpcSlice({
  main: {
    async openLinkInBrowserWindow(_, link: string) {
      shell.openExternal(link);
    },
  },
});
