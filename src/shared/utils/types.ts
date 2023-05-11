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
  CLIPBOARD_DELETE_ERROR = "CLP_220",
  FILE_READ_ERROR = "FLR_300",
  FILE_WRITE_ERROR = "FLW_304",
  UNEXPECTED_ERROR = "UEX_700",
}

export interface SettingsData {
  colorMode: ColorMode;
  canSync: boolean;
  color: string;
  appId: string | undefined;
  syncUrl: string;
  isAdvanceMode: boolean;
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
  date: string;
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

export interface SyncLogArgs {
  pull: boolean;
  push: boolean;
  docs_read_push: number | undefined;
  docs_written_push: number | undefined;
  docs_read_pull: number | undefined;
  docs_written_pull: number | undefined;
  pull_start_time: Date | undefined;
  push_start_time: Date | undefined;
  pull_doc_write_failures: number | undefined;
  push_doc_write_failures: number | undefined;
}
