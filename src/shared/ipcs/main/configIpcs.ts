import { createIpcSlice } from "interprocess";
import { SettingsData } from "../../utils/types";
import path from "path";
import { app } from "electron";
import * as fs from "fs";

export const ConfigIpcs = createIpcSlice({
  main: {
    async saveSettings(_, settings: SettingsData) {
      const settingsPath = path.join(
        app.getPath("appData"),
        "/clipSync/settings.json"
      );
      const stringifiedSettings = JSON.stringify(settings);
      console.log(stringifiedSettings);

      await fs.writeFileSync(settingsPath, stringifiedSettings, {
        encoding: "utf-8",
      });
      return true;
    },
    async readSettings() {
      const settingsPath = path.join(
        app.getPath("appData"),
        "/clipSync/settings.json"
      );
      const settingsData: SettingsData = JSON.parse(
        fs.readFileSync(settingsPath, { encoding: "utf-8" })
      );

      return settingsData;
    },
  },
});
