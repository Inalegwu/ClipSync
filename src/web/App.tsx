import React from "react";
import "./App.css";
import { Box } from "./component/styled";
import useWindowApi from "./hooks/useWindowApi";
import { useColorModeValue } from "./state";
import ClipBoardItem from "./component/ClipBoardItem";

export const App = () => {
  const { invoke } = useWindowApi();
  const { colorMode } = useColorModeValue();
  const [clipBoardData, setClipBoardData] = React.useState<Array<string>>([]);

  React.useMemo(() => {
    invoke.readClipBoard().then((res) => {
      setClipBoardData([res]);
    });
  }, [clipBoardData]);

  return (
    <Box
      css={{
        width: "100%",
        height: "100vh",
        background: `${
          colorMode === "Light" ? "$background" : "$backgroundDark"
        }`,
        color: `${colorMode == "Light" ? "$backgroundDark" : "$background"}`,
        padding: "$2",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
      }}
    >
      {clipBoardData.map((data, index) => {
        return <ClipBoardItem item={data} key={index} />;
      })}
    </Box>
  );
};
