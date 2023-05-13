import type { NativeImage } from "electron";
import { Box, Button, Image } from "./styled";
import { useColorModeValue, usePrimaryColor } from "../state";
import { FiCopy, FiDelete } from "react-icons/fi";
import { ClipBoardItem } from "../../shared/utils/types";

export interface ClipImageProps {
  data?: ClipBoardItem;
}

export default function ClipImage({ data }: ClipImageProps) {
  const { colorMode } = useColorModeValue();
  const { primaryColor } = usePrimaryColor();
  return (
    <Box
      css={{
        background: `${colorMode === "Dark" ? "$blackMuted" : "white"}`,
        borderRadius: "5px",
        marginTop: "$1",
        marginBottom: "$1",
        padding: "$2",
        display: "flex",
        flexDirection: "column",
        gap: "$2",
        height: "fit-content",
      }}
    >
      <Image
        css={{
          width: "100%",
          height: "60%",
          borderRadius: "5px",
          border: `0.1px solid ${colorMode === "Dark" ? "$black" : "white"}`,
        }}
      />
      <Box css={{ display: "flex", gap: "$2", width: "100%", height: "40%" }}>
        <Button
          css={{
            background: `${colorMode === "Dark" ? "black" : "$whiteMuted"}`,
            color: `${primaryColor}`,
            "&:hover": {
              background: `${primaryColor}`,
              color: "white",
            },
            outlineColor: `${primaryColor}`,
          }}
        >
          <FiCopy size={13} />
        </Button>
        <Button
          css={{
            background: `${colorMode === "Dark" ? "black" : "$whiteMuted"}`,
            color: "$danger",
            "&:hover": {
              background: "$danger",
              color: "white",
            },
            outlineColor: `${primaryColor}`,
          }}
        >
          <FiDelete size={13} />
        </Button>
      </Box>
    </Box>
  );
}
