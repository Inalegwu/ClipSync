import React from "react";
import useWindowApi from "./hooks/useWindowApi";
import {
  useClipBoard,
  useColorModeValue,
  usePrimaryColor,
  useUserState,
} from "./state";
import { Box, Button, Input, LinkButton, Paragraph } from "./component/styled";
import { FiSettings, FiArrowDown, FiArrowUp } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import ClipItem from "./component/ClipItem";
import "./index.css";
import { useSyncState } from "./state/syncState";

/**
 *
 * IMPORT THE POUCH DB DATABASE
 *
 */
import db from "../shared/utils/db";

export const App = () => {
  const { invoke } = useWindowApi();
  const { colorMode, setColorMode } = useColorModeValue();
  const { primaryColor, setPrimaryColor } = usePrimaryColor();
  const { canSync, syncUrl, setSyncUrl, changeSyncState } = useSyncState();
  const { clipBoardData, setClipBoardData } = useClipBoard();
  const { appId, setAppId } = useUserState();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const viewRef = React.useRef<HTMLDivElement>(null);

  /**
   *
   * LISTEN TO CLIPBOARD CHANGES,
   * PUSH TO THE DATABASE AND READ FROM
   * THE SAME DATABASE IN THE SAME PASS
   *
   */
  function readFromClipboard() {
    invoke
      .readClipBoardText()
      .then((res) => {
        if (res !== "") {
          invoke.debugPrint({ data: appId, description: "Found Your App ID" });
          db.put({
            _id: new Date().toISOString(),
            appId: appId!,
            data: res,
            dateCreated: new Date().toISOString(),
          });
        }
      })
      .catch((reason) => {
        invoke.sendErrorData({ error: reason, description: "Failed to put" });
      });
  }

  function readDb() {
    db.allDocs({ include_docs: true, key: appId, descending: true })
      .then((res: PouchDB.Core.AllDocsResponse<{}>) => {
        res.rows.forEach((row: PouchDB.Core.ExistingDocument<any>) => {
          setClipBoardData({
            appId: row.doc?.appId,
            data: row.doc?.data,
            id: row.id,
            _rev: row.value.rev,
            dateCreated: row.doc?.dateCreated,
          });
        });
      })
      .catch((err) => {
        invoke.sendErrorData({ error: err, description: "Read DB Error" });
      });
  }

  const readUserPreferences = React.useCallback(() => {
    invoke
      .readSettings()
      .then((settings) => {
        setColorMode(settings.colorMode);
        changeSyncState(settings.canSync);
        setPrimaryColor(settings.color);
        setAppId(settings.appId!);
        setSyncUrl(settings.syncUrl);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }, [colorMode, canSync, primaryColor, appId, syncUrl]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      readFromClipboard();
    }, 2000);

    const clearClipBoardInterval = setInterval(() => {
      invoke.clearClipBoard();
    }, 5000);

    // run once the app is mounted
    readDb();

    /**
     *
     * begin the syncing
     *
     */
    if (canSync === true) {
      db.sync(syncUrl, {
        live: true,
        retry: true,
        timeout: 10000,
      }).on("complete", () => {
        toast.success("Syncing Complete");
      });
    }

    return () => {
      clearInterval(interval);
      clearInterval(clearClipBoardInterval);
    };
  }, []);

  React.useMemo(() => {
    readUserPreferences();
  }, []);

  /***
   *
   * refactor this block to add to the database as well as append to the clipboard
   *
   */

  function addToClipBoard(text: string) {
    invoke.appendToClipBoard(text);
  }

  function scrollToBottom() {
    viewRef.current?.scrollTo({ top: clipBoardData.length * 500 });
  }

  function scrollToTop() {
    viewRef.current?.scrollTo({ top: -clipBoardData.length });
  }

  window.addEventListener("keydown", (ev) => {
    if (ev.key === "PageUp") {
      scrollToTop();
    } else if (ev.key === "PageDown") {
      scrollToBottom();
    }
  });

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
          justifyContent: "space-between",
        }}
      >
        <Box
          css={{
            display: "flex",
            gap: "$2",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={scrollToTop}
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
            <FiArrowUp size={14} />
          </Button>
          <Button
            onClick={scrollToBottom}
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
            <FiArrowDown size={14} />
          </Button>
        </Box>
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
        ref={viewRef}
        css={{
          height: "80%",
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
        }}
      >
        {clipBoardData &&
          clipBoardData.map((data, idx) => {
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
          outlineColor: "none",
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
            width: "200px",
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
