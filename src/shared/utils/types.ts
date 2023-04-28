/**
 *
 * TYPE DEFINITIONS USED APP WIDE
 *
 */
import { ColorMode } from "../../web/state";

export interface SettingsData {
  colorMode: ColorMode;
  syncState: boolean;
  color: string;
  appId: string | null;
}

export type ClipItemType = "IMAGE" | "HTML" | "TEXT";

export interface ClipBoardItem {
  id: string;
  data: string;
  appId: string;
  _rev?: string;
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

export interface Row {}
