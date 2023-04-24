import { combineIpcs } from "interprocess";
import { ConfigIpcs } from "./main/configIpcs";
import { ProcessIpcs } from "./main/processIpcs";
import { ExternalIpcs } from "./main/externalIpcs";

export const { ipcMain, ipcRenderer, exposeApiToGlobalWindow } = combineIpcs(
  ConfigIpcs,
  ProcessIpcs,
  ExternalIpcs
);
