import React from "react";
import useWindowApi from "./hooks/useWindowApi";
import {
  useClipBoard,
  useColorModeValue,
  usePrimaryColor,
  useUserState,
} from "./state";
import { Box, Input, LinkButton } from "./component/styled";
import { FiSettings, FiInfo } from "react-icons/fi";
import { Toaster } from "react-hot-toast";
import ClipItem from "./component/ClipItem";
import "./index.css";
import { useSyncState } from "./state/syncState";
import { v4 } from "uuid";
import db from "../shared/utils/db";

export const App = () => {
  const { invoke } = useWindowApi();
  const { colorMode, setColorMode } = useColorModeValue();
  const { primaryColor, setPrimaryColor } = usePrimaryColor();
  const { changeSyncState } = useSyncState();
  const { clipBoardData, setClipBoardData } = useClipBoard();
  const { appId, setAppId } = useUserState();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    invoke
      .readClipBoard()
      .then((res) => {
        db.put({ _id: new Date().toISOString(), appId: appId, data: res });
      })
      .then(() => {
        db.allDocs({ include_docs: true, key: appId })
          .then((res: PouchDB.Core.AllDocsResponse<{}>) => {
            res.rows.forEach((row) => {
              setClipBoardData({
                appId: row.doc?.appId,
                data: row.doc?.data,
                id: row.id,
                _rev: row.value.rev,
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, [inputRef.current?.value]);

  React.useMemo(() => {
    invoke
      .readSettings()
      .then((settings) => {
        setColorMode(settings.colorMode);
        changeSyncState(settings.syncState);
        setPrimaryColor(settings.color);
        setAppId(appId);
      })
      .catch((reason) => {
        console.log(reason);
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
              background: `${primaryColor}`,
              color: "white",
            },
            outlineColor: `${primaryColor}`,
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
            outlineColor: `${primaryColor}`,
            "&:hover": {
              background: `${primaryColor}`,
              color: "white",
            },
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
          // return <Box key={idx}>{data.id}</Box>;
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
          outline: "none",
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
            outlineColor: `${primaryColor}`,
          },
        }}
      />
    </Box>
  );
};
