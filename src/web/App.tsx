import React from "react";
import useWindowApi from "./hooks/useWindowApi";
import {
  useAdvanceMode,
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
import { ClipBoardItem, ErrorCode } from "../shared/utils/types";
import ClipImage from "./component/ClipImage";

export const App = () => {
  const { invoke } = useWindowApi();
  const { colorMode, setColorMode } = useColorModeValue();
  const { primaryColor, setPrimaryColor } = usePrimaryColor();
  const { canSync, syncUrl, setSyncUrl, changeSyncState } = useSyncState();
  const { setAdvanceMode } = useAdvanceMode();
  const { clipBoardData, setClipBoardData } = useClipBoard();
  const { appId, setAppId } = useUserState();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const viewRef = React.useRef<HTMLDivElement>(null);

  // read text from the clipboard and append it to the
  // local pouchdb database
  function readFromClipboard() {
    invoke
      .readClipBoardText()
      .then((res) => {
        if (res !== "") {
          db.put({
            _id: new Date().toISOString(),
            appId: appId,
            data: res,
            dateCreated: new Date().toISOString(),
            device: "laptop",
          });
        }
      })
      .catch((reason) => {
        invoke.sendErrorData({
          error: reason,
          description: "Failed write clipboard content to database",
          error_code: ErrorCode.DATABASE_WRITE_ERROR,
          date: new Date().toISOString(),
        });
      });
  }

  // read images from the clipboard and append append it to the
  // local pouchdb database
  function readClipBoardImage() {
    invoke
      .readClipBoardImage()
      .then((value) => {
        invoke.debugPrint({
          data: value.isEmpty(),
          description: "Clipboard image",
        });
      })
      .catch((err) => {
        invoke.debugPrint({
          data: err,
          description: "Failed to read Clipboard Image",
        });
      });
  }

  // read clipboard items from the local pouchdb database
  function readDb() {
    db.allDocs({
      include_docs: true,
      startkey: appId,
      descending: true,
      attachments: true,
    })
      .then((res: PouchDB.Core.AllDocsResponse<{ doc?: ClipBoardItem }>) => {
        // set the clipboard data to the entire row data
        // received from the db , instead of appending
        // appending will continually add items to the list
        // and this will cause an infinite render loop, which is very
        // hurtful to the app performance.In fact the app will be stuck
        // so there will be no performance
        setClipBoardData(res.rows);
      })
      .catch((err) => {
        invoke.sendErrorData({
          error: err,
          description: "Failed to read clipboards from database",
          error_code: ErrorCode.DATABASE_READ_ERROR,
          date: new Date().toISOString(),
        });
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
        setAdvanceMode(settings.isAdvanceMode);
      })
      .catch((reason) => {
        invoke.sendErrorData({
          error: reason,
          description: "Failed to read Settings",
          error_code: ErrorCode.FILE_READ_ERROR,
          date: new Date().toISOString(),
        });
      });
  }, [colorMode, canSync, primaryColor, appId, syncUrl, setAdvanceMode]);

  React.useEffect(() => {
    // read the clipboard every 2 seconds
    const interval = setInterval(() => {
      readFromClipboard();
      // readClipBoardImage();
    }, 2000);

    // clears the clipboard every 5 seconds
    const clearClipBoardInterval = setInterval(() => {
      invoke.clearClipBoard();
    }, 5000);

    // read the database every 100 seconds
    // by this time , at some point , the clipboard will be empty
    // and there is code to ensure nothing is appended when the clipboard is empty
    // in readClipBoard()
    const readDbInterval = setInterval(() => {
      readDb();
    }, 100);

    // if the app is allowed to sync ,
    // begin the live syncing of the local
    // instance to the remote instance and vice versa
    if (canSync === true) {
      db.sync(syncUrl, {
        live: true,
        retry: true,
        timeout: 10000,
      })
        .on("complete", (info) => {
          invoke.logSyncFinished({
            pull: true,
            push: true,
            docs_read_pull: info.pull?.docs_read!,
            docs_written_pull: info.pull?.docs_written!,
            docs_read_push: info.push?.docs_read!,
            docs_written_push: info.push?.docs_written!,
            pull_start_time: info.pull?.start_time!,
            push_start_time: info.push?.start_time!,
            pull_doc_write_failures: info.pull?.doc_write_failures!,
            push_doc_write_failures: info.push?.doc_write_failures!,
          });
          toast.success("All Items Synced Successfully");
        })
        .on("error", (err) => {
          invoke.debugPrint({ data: err, description: "syncing paused" });
          toast.error("An Error Occured While Syncing...");
        })
        .catch((err) => {
          invoke.sendErrorData({
            error: err,
            description: "Syncing Failed",
            error_code: ErrorCode.DATABASE_SYNC_ERROR,
            date: new Date().toISOString(),
          });
        });
    }

    // dispose of all intervals when done
    // if not , bad things happen
    return () => {
      clearInterval(interval);
      clearInterval(clearClipBoardInterval);
      clearInterval(readDbInterval);
    };
  }, []);

  // run read user preferences only once
  // why did i use memo ? no reason exactly
  // i really just wanted my effect code separate
  React.useMemo(() => {
    readUserPreferences();
  }, []);

  // allows the user type in data to append to the clipboard
  // I don't know if this is something people will use ,
  // but I use it
  function addToClipBoard(text: string) {
    invoke.appendTextToClipBoard(text);
  }

  function scrollToBottom() {
    viewRef.current?.scrollTo({ top: clipBoardData.length * 500 });
  }

  function scrollToTop() {
    viewRef.current?.scrollTo({ top: -clipBoardData.length });
  }

  // listens for the PageUp and PageDown keys to
  // scroll the page
  window.addEventListener("keydown", (ev) => {
    if (ev.key === "PageUp") {
      scrollToTop();
    } else if (ev.key === "PageDown") {
      scrollToBottom();
    }
  });

  window.ononline = () => {
    toast.success("Connection Established");
  };

  window.onoffline = () => {
    toast.loading("Waiting for network to continue syncing");
  };

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
            // i should probably find a way to fix this ts ignore
            // @ts-ignore
            return <ClipItem data={data} key={idx} />;
            // return <Box key={idx}>{data.id}</Box>;
          })}
        {/* <ClipImage /> */}
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
