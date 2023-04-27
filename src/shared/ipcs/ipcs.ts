import { combineIpcs } from "interprocess";
import { ConfigIpcs, DebugIpcs, ExternalIpcs, ProcessIpcs } from "./main";

export const { ipcMain, ipcRenderer, exposeApiToGlobalWindow } = combineIpcs(
  ConfigIpcs,
  ProcessIpcs,
  ExternalIpcs,
  DebugIpcs
);
