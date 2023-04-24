import React from "react";
import useWindowApi from "./hooks/useWindowApi";
import { useClipBoard, useColorModeValue } from "./state";
import { Box, Input, LinkButton } from "./component/styled";
import { FiSettings, FiInfo } from "react-icons/fi";
import { Toaster } from "react-hot-toast";
import ClipItem from "./component/ClipItem";
import "./index.css";
import { useSyncState } from "./state/syncState";
import { ClipType } from "../shared/utils/types";
import ClipImage from "./component/ClipImage";
import db from "../shared/utils/db";
import superjson from "superjson";
import * as UUId from "uuid";

export const App = () => {
  const { invoke } = useWindowApi();
  const { colorMode, setColorMode } = useColorModeValue();
  const { changeSyncState, changeSyncFrequency } = useSyncState();
  const { clipBoardState, updateClipBoardState } = useClipBoard();
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
      changeSyncState(settings.syncState);
      changeSyncFrequency(settings.syncFrequency);
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
          to="/about"
          css={{
            width: "30px",
            height: "30px",
            "&:hover": {
              background: "$primary",
              color: "white",
            },
          }}
          variant={colorMode === "Dark" ? "dark" : "light"}
        >
          <FiInfo size={14} />
        </LinkButton>
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
          border: "0.1px solid #3838383c",
        }}
        variant={colorMode === "Dark" ? "dark" : "light"}
      />
      <Toaster
        position="bottom-center"
        reverseOrder={true}
        toastOptions={{
          duration: 700,
          style: {
            padding: "5px",
            width: "50px",
            fontSize: "14px",
            background: `${colorMode === "Dark" ? "black" : "white"}`,
            color: `${colorMode === "Dark" ? "white" : "black"}`,
            fontFamily: "Nunito",
          },
        }}
      />
    </Box>
  );
};
