import { createIpcSlice } from "interprocess";
import { SettingsData } from "../../utils/types";
import path from "path";
import { app } from "electron";
import * as fs from "fs";
import superjson from "superjson";

/**
 *
 *
 * ALL IPCS RELATED TO CONFIGURING THE APPLICATIONS
 * -SETTINGS
 *  -APPLICATION ID
 *  -COLOR MODE
 */
export const ConfigIpcs = createIpcSlice({
  main: {
    async saveSettings(_, settings: SettingsData) {
      const stringifiedSettings = superjson.stringify(settings);
      fs.writeFile(
        path.join(app.getPath("appData"), "ClipSync/settings.json"),
        stringifiedSettings,
        "utf-8",
        (err) => {
          if (err) throw err;
        }
      );
      return true;
    },
    async readSettings() {
      const settingsPath = path.join(
        app.getPath("appData"),
        "ClipSync/settings.json"
      );
      const settingsData: SettingsData = superjson.parse(
        fs.readFileSync(settingsPath, { encoding: "utf-8" })
      );

      return settingsData;
    },
  },
});
