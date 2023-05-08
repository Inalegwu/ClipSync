import { shell } from "electron";
import { createIpcSlice } from "interprocess";

/**
 *
 * HANDLE OPENING THINGS OUTSIDE THE APP
 * JUST A WRAPPER AROUND THE ELECTRON SHELL
 * FOR OPENING EXTERNAL LINKS
 *
 */
export const ExternalIpcs = createIpcSlice({
  main: {
    async openLinkInBrowserWindow(_, link: string) {
      shell.openExternal(link);
    },
  },
});
