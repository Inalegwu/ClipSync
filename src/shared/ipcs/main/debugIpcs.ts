import { createIpcSlice } from "interprocess";
import type {
  DebugPrintArgs,
  ErrorDataArgs,
  SyncLogArgs,
} from "../../utils/types";
import * as fs from "fs";
import path from "path";
import { app } from "electron";
import superjson from "superjson";

export const DebugIpcs = createIpcSlice({
  main: {
    async debugPrint(_, { data, description }: DebugPrintArgs) {
      console.log(`DEBUG::DATA:${data}::DESCRIPTION:${description}`);
    },
    async sendErrorData(
      _,
      { error, description, error_code, date }: ErrorDataArgs
    ) {
      const logsPath = path.join(
        app.getPath("appData"),
        "ClipSync/error_logs.json"
      );
      const logString = superjson.stringify({
        error,
        description,
        error_code,
        date,
        platform: process.platform,
      });
      fs.writeFileSync(logsPath, logString, { encoding: "binary" });

      /**
       *
       * TODO implement sending error logs to a remote url for parsing and
       * TODO debugging...y'know like how the pros do it
       *
       * set up a bug tracking API and connect said api to a frontend
       * where these issues can be tracked...
       *
       *
       */
      if (process.env.NODE_ENV === "development") {
        console.log(
          `ERROR:${error}::DESCRIPTION:${description}::ERROR CODE :${error_code}`
        );
      }
    },
    async logSyncFinished(
      _,
      {
        pull,
        push,
        docs_read_pull,
        docs_written_pull,
        docs_read_push,
        docs_written_push,
        pull_start_time,
        push_start_time,
        pull_doc_write_failures,
        push_doc_write_failures,
      }: SyncLogArgs
    ) {
      const logsPath = path.join(
        app.getPath("appData"),
        "/ClipSync/sync_logs.json"
      );
      const logsString = superjson.stringify({
        pull,
        push,
        docs_read_pull,
        docs_written_pull,
        docs_read_push,
        docs_written_push,
        pull_start_time,
        push_start_time,
        pull_doc_write_failures,
        push_doc_write_failures,
      });

      fs.writeFileSync(logsPath, logsString, { encoding: "binary" });
    },
  },
});
