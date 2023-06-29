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
      if (process.env.NODE_ENV === "development") {
        console.log(
          `ERROR:${error}::DESCRIPTION:${description}::ERROR CODE :${error_code}`
        );
      }else{
        fs.writeFileSync(logsPath, logString, { encoding: "binary" });
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

      if(process.env.NODE_ENV==="development"){
        console.log(logsString)  
      }else{
        fs.writeFileSync(logsPath, logsString, { encoding: "binary" });      
      }
    },
  },
});
