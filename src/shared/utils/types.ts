import { SyncFrequency } from "../../web/state/syncState";
import { ColorMode } from "../../web/state";
import { NativeImage } from "electron";

export interface SettingsData {
  colorMode: ColorMode;
  syncState: boolean;
  syncFrequency: SyncFrequency;
}

export type ClipItemType = "IMAGE" | "HTML" | "TEXT";

export interface ClipType {
  type: ClipItemType;
  data: NativeImage | string;
}

export interface ClipStore {
  clipPrefix: string;
  clips: Array<ClipType>;
}
