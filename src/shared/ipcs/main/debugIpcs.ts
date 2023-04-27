import { createIpcSlice } from "interprocess";
import type { DebugPrintArgs, ErrorDataArgs } from "../../utils/types";

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
      console.log(error, description);
    },
  },
});
