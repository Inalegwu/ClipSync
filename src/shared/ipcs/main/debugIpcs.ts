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
 * LATER : only remove debug print function
 * send error data will be used for error reporting in test builds
 * release build will send usage data optionally
 *
 *
 * */
export const DebugIpcs = createIpcSlice({
  main: {
    async debugPrint(_, { data, description }: DebugPrintArgs) {
      console.log(`DEBUG::DATA:${data}::DESCRIPTION:${description}`);
    },
    async sendErrorData(_, { error, description, error_code }: ErrorDataArgs) {
      const logsPath = path.join(app.getPath("appData"), "serpent/logs.json");
      const logString = superjson.stringify({ error, description, error_code });
      fs.writeFileSync(logsPath, logString, { encoding: "binary" });

      /**
       *
       * TODO implement sending error logs to a remote url for parsing and
       * TODO debugging...y'know like how the pros do it
       *
       */

      console.log(
        `ERROR:${error}::DESCRIPTION:${description}::ERROR CODE :${error_code}`
      );
    },
  },
});
