import { combineIpcs } from "interprocess";
import { ConfigIpcs } from "./main/configIpcs";
import { ProcessIpcs } from "./main/processIpcs";

export const { ipcMain, ipcRenderer, exposeApiToGlobalWindow } = combineIpcs(
  ConfigIpcs,
  ProcessIpcs
);
