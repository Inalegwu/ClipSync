import { clipboard } from "electron";
import { ClipType } from "./types";

export default function readClipBoard() {
  const clipboardItems: Array<ClipType> = [];

  const clipboardImage: ClipType = {
    data: clipboard.readImage("clipboard"),
    type: "IMAGE",
  };
  const clipboardText: ClipType = {
    data: clipboard.readText("clipboard"),
    type: "TEXT",
  };
  const clipboardHtml: ClipType = {
    data: clipboard.readHTML("clipboard"),
    type: "HTML",
  };

  return [clipboardHtml, clipboardText, clipboardImage];
}
