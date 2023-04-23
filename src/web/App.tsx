import React from "react";
import useWindowApi from "./hooks/useWindowApi";
import { useColorModeValue } from "./state";
import { Box, Input, LinkButton } from "./component/styled";
import { FiSettings } from "react-icons/fi";
import { Toaster } from "react-hot-toast";
import ClipItem from "./component/ClipItem";
import "./index.css";

export const App = () => {
  const { invoke } = useWindowApi();
  const { colorMode, setColorMode } = useColorModeValue();
  const [clipBoardData, setClipBoardData] = React.useState<Array<string>>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useMemo(() => {
    invoke.readClipBoard().then((res) => {
      setClipBoardData([res]);
    });
  }, [clipBoardData]);

  React.useEffect(() => {
    invoke.readSettings().then((settings) => {
      setColorMode(settings.colorMode);
    });
  }, []);

  function addToClipBoard(text: string) {
    invoke.appendToClipBoard(text);
  }

  return (
    <Box
      css={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        padding: "$2",
        background: `${
          colorMode === "Dark" ? "$backgroundDark" : "$background"
        }`,
        color: `${colorMode === "Dark" ? "$background" : "$backgroundDark"}`,
      }}
    >
      <Box
        css={{
          width: "100%",
          height: "10%",
          display: "flex",
          alignContent: "center",
          gap: "10px",
          justifyContent: "flex-end",
        }}
      >
        <LinkButton
          to="/settings"
          css={{
            width: "30px",
            height: "30px",
          }}
          variant={colorMode === "Dark" ? "dark" : "light"}
        >
          <FiSettings size={14} />
        </LinkButton>
      </Box>
      <Box
        css={{
          height: "80%",
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
        }}
      >
        {clipBoardData?.map((data, idx) => {
          return <ClipItem data={data} key={idx} />;
        })}
      </Box>
      <Input
        ref={inputRef}
        type="Text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addToClipBoard(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
        placeholder="Add To Clipboard"
        css={{
          height: "10%",
          width: "100%",
        }}
        variant={colorMode === "Dark" ? "dark" : "light"}
      />
      <Toaster position="bottom-center" reverseOrder={true} />
    </Box>
  );
};
