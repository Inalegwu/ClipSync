import {useEffect,useCallback,useRef,useMemo} from "react";
import { useWindowApi } from "./hooks";
import {
  useAdvanceMode,
  useClipBoard,
  useColorModeValue,
  usePrimaryColor,
  useUserState,
  useSyncState,
} from "./state";
import { Box, Button, Input, LinkButton} from "./component/styled";
import { ClipItem } from "./component";
import { FiSettings, FiArrowDown, FiArrowUp } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../shared/utils";
import { ClipBoardItem, ErrorCode } from "../shared/utils/types";

export default function App() {
  const { invoke } = useWindowApi();
  const { colorMode, setColorMode } = useColorModeValue();
  const { primaryColor, setPrimaryColor } = usePrimaryColor();
  const { canSync, syncUrl, setSyncUrl, changeSyncState } = useSyncState();
  const { setAdvanceMode } = useAdvanceMode();
  const { clipBoardData, setClipBoardData } = useClipBoard();
  const { appId, setAppId } = useUserState();
  const inputRef = useRef<HTMLInputElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);

  const readFromClipboard = useCallback(() => {
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
      .catch((reason: any) => {
        invoke.sendErrorData({
          error: reason,
          description: "Failed write clipboard content to database",
          error_code: ErrorCode.DATABASE_WRITE_ERROR,
          date: new Date().toISOString(),
        });
      });
  }, []);

  const readDb = useCallback(() => {
    db.allDocs({
      include_docs: true,
      startkey: appId,
      descending: true,
      attachments: true,
    })
      .then((res: PouchDB.Core.AllDocsResponse<{ doc?: ClipBoardItem }>) => {
        setClipBoardData(res.rows);
        invoke.clearClipBoard();
      })
      .catch((err: any) => {
        invoke.sendErrorData({
          error: err,
          description: "Failed to read clipboards from database",
          error_code: ErrorCode.DATABASE_READ_ERROR,
          date: new Date().toISOString(),
        });
      });
  }, [db]);

  const readUserPreferences = useCallback(() => {
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
      .catch((reason: any) => {
        invoke.sendErrorData({
          error: reason,
          description: "Failed to read Settings",
          error_code: ErrorCode.FILE_READ_ERROR,
          date: new Date().toISOString(),
        });
      });
  }, [colorMode, canSync, primaryColor, appId, syncUrl, setAdvanceMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      readFromClipboard();
    }, 2000);

    const clearClipBoardInterval = setInterval(() => {
      invoke.clearClipBoard();
    }, 5000);

    const readDbInterval = setInterval(() => {
      readDb();
    }, 100);

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
          toast.success("All Items Synced Successfully", { duration: 300 });
        })
        .on("error", (err: any) => {
          invoke.debugPrint({ data: err, description: "syncing paused" });
          toast.error("An Error Occured While Syncing...", { duration: 300 });
        })
        .catch((err: any) => {
          invoke.sendErrorData({
            error: err,
            description: "Syncing Failed",
            error_code: ErrorCode.DATABASE_SYNC_ERROR,
            date: new Date().toISOString(),
          });
        });
    }

    return () => {
      clearInterval(interval);
      clearInterval(clearClipBoardInterval);
      clearInterval(readDbInterval);
    };
  }, []);

  useMemo(() => {
    readUserPreferences();
  }, []);

  const addToClipBoard = useCallback((text: string) => {
    invoke.appendTextToClipBoard(text);
  }, []);

  const scrollToBottom = useCallback(() => {
    viewRef.current?.scrollTo({ top: clipBoardData.length * 500 });
  }, [viewRef]);

  const scrollToTop = useCallback(() => {
    viewRef.current?.scrollTo({ top: -clipBoardData.length });
  }, [viewRef]);

  window.addEventListener("keydown", (ev) => {
    if (ev.key === "PageUp") {
      scrollToTop();
    } else if (ev.key === "PageDown") {
      scrollToBottom();
    }
  });

  window.ononline = () => {
    toast.success("Connection Established", { duration: 300 });
  };

  window.onoffline = () => {
    toast.loading("Waiting for network to continue syncing", { duration: 300 });
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
            // @ts-ignore - doc doesn't exist on data
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
}
