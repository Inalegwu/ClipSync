/**
 *
 * TYPE DEFINITIONS USED APP WIDE
 *
 */
import { NativeImage } from "electron";
import { ColorMode } from "../../web/state";
import { persist } from "zustand/middleware";

// ERROR CODE FOR USE WHEN READING ERROR LOGS IN THE
// MY ERROR LOG INTERFACE
export enum ErrorCode {
  DATABASE_READ_ERROR = "DB_100",
  DATABASE_WRITE_ERROR = "DB_102",
  DATABASE_SYNC_ERROR = "DB_104",
  CLIPBOARD_READ_ERROR = "CLP_200",
  CLIPBOARD_WRITE_ERROR = "CLP_210",
  FILE_READ_ERROR = "FLI_300",
  FILE_WRITE_ERROR = "FLI_304",
  UNEXPECTED_ERROR = "UEX_700",
}

export interface SettingsData {
  colorMode: ColorMode;
  canSync: boolean;
  color: string;
  appId: string | undefined;
  syncUrl: string;
}

export type ClipItemType = "IMAGE" | "HTML" | "TEXT";

export interface ClipBoardData {
  data: string | Electron.NativeImage;
  type: ClipItemType;
}

export interface ClipBoardItem {
  id: string;
  data: string;
  appId: string;
  _rev: string;
  dateCreated: string;
  _id: string;
}

export interface ClipStore {
  clipPrefix: string;
  clips: Array<ClipBoardItem>;
}

export interface DebugPrintArgs {
  data: any;
  description: string;
}

export interface ErrorDataArgs {
  error: any;
  description: string;
  error_code: ErrorCode;
}

export interface Row {
  id: string;
  key: string;
  value: {
    rev: string;
  };
  doc: {
    appId: string;
    data: string;
    _id: string;
    _rev: string;
  };
}

export const Middlware = ({ f, name }: { f: () => any; name: string }) =>
  persist(f, { name });
