/**
 *
 * TYPE DEFINITIONS USED APP WIDE
 *
 */
import { NativeImage } from "electron";
import { ColorMode } from "../../web/state";

export interface SettingsData {
  colorMode: ColorMode;
  canSync: boolean;
  color: string;
  appId: string | undefined;
  syncUrl: string;
}

export type ClipItemType = "IMAGE" | "HTML" | "TEXT";

export interface ClipBoardImage {
  data: Buffer;
  dataUrl: Buffer;
}

export interface ClipBoardText {
  data: string;
}

export interface ClipBoardItem {
  id: string;
  data: string;
  appId: string;
  _rev: string;
  dateCreated: string;
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
