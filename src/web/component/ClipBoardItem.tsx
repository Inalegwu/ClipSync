import { useColorModeValue } from "../state";
import { Box } from "./styled";

function ClipBoardItem({ item }: { item: string }) {
  const { colorMode } = useColorModeValue();
  return (
    <Box
      css={{
        width: "95%",
        background: `${
          colorMode === "Dark" ? "$backgroundDarkMuted" : "$backgroundMuted"
        }`,
        borderRadius: "10px",
      }}
    >
      {item}
    </Box>
  );
}

export default ClipBoardItem;
