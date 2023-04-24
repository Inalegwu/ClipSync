import { NativeImage } from "electron";
import { Image } from "./styled";

export interface ClipImageProps {
  data: NativeImage;
}

export default function ClipImage({ data }: ClipImageProps) {
  return <Image src={data.toDataURL()} />;
}
