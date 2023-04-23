import { ColorMode } from "../../web/state";

export interface SettingsData {
  colorMode: ColorMode;
  syncState: boolean;
  syncFrequency: Date;
}

export interface ClipItem {
  text: string;
  date: Date;
}

export interface ClipStore {
  clipPrefix: string;
  clips: Array<ClipItem>;
}
