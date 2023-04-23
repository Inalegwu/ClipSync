import { createIpcSlice } from "interprocess";
import { SettingsData } from "../../utils/types";
import path from "path";
import { app } from "electron";
import * as fs from "fs";
import superjson from "superjson";

export const ConfigIpcs = createIpcSlice({
  main: {
    async saveSettings(_, settings: SettingsData) {
      const stringifiedSettings = superjson.stringify(settings);
      console.log(stringifiedSettings);

      fs.writeFile(
        path.join(app.getPath("appData"), "serpent/settings.json"),
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
        "serpent/settings.json"
      );
      const settingsData: SettingsData = superjson.parse(
        fs.readFileSync(settingsPath, { encoding: "utf-8" })
      );

      return settingsData;
    },
  },
});
