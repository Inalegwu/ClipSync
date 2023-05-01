import { createIpcSlice } from "interprocess";
import type { DebugPrintArgs, ErrorDataArgs } from "../../utils/types";
import * as fs from "fs";
import path from "path";
import { app } from "electron";
import superjson from "superjson";

/**
 *
 * IPC'S RELATED TO DEBUGGING AND ERROR DATA
 * MIGHT REMOVE.
 *
 * */
export const DebugIpcs = createIpcSlice({
  main: {
    async debugPrint(_, { data, description }: DebugPrintArgs) {
      console.log("Data : ", data, "Description : ", description);
    },
    async sendErrorData(_, { error, description }: ErrorDataArgs) {
      const logsPath = path.join(
        app.getPath("appData"),
        "serpent/logs/logs.txt"
      );
      const logString = superjson.stringify({ error, description });
      fs.writeFileSync(logsPath, logString, { encoding: "binary" });

      /**
       *
       * TODO implement sending error logs to a remote url for parsing and
       * TODO debugging...y'know like how the pros do it
       *
       */

      console.log(error, description);
    },
  },
});
