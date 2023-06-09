import React, { useEffect, useCallback, useRef, useState } from "react";
import {
  Box,
  Button,
  Input,
  LinkButton,
  Paragraph,
  Title,
} from "../component/styled";
import {
  useAdvanceMode,
  useClipBoard,
  useColorModeValue,
  useFirstLaunchState,
  usePrimaryColor,
  useSyncState,
  useUserState,
} from "../state";
import {
  FiCopy,
  FiEdit2,
  FiHome,
  FiInfo,
  FiRefreshCw,
  FiTrash,
} from "react-icons/fi";
import { SettingsItem, Switch, SwitchRef } from "../component";
import { useWindowApi } from "../hooks";
import { ErrorCode, SettingsData } from "../../shared/utils/types";
import { Toaster, toast } from "react-hot-toast";
import { generateAppId, db } from "../../shared/utils";

function Settings() {
  const { invoke } = useWindowApi();
  const { colorMode, setColorMode } = useColorModeValue();
  const { primaryColor, setPrimaryColor } = usePrimaryColor();
  const { canSync, changeSyncState, syncUrl, setSyncUrl } = useSyncState();
  const { isAdvanceMode, setAdvanceMode } = useAdvanceMode();
  const { clipBoardData } = useClipBoard();
  const { appId, setAppId } = useUserState();
  const { isFirstLaunch } = useFirstLaunchState();
  const themeSwitchRef = useRef<SwitchRef>(null);
  const syncSwitchRef = useRef<SwitchRef>(null);
  const advanceModeSwitchRef = useRef<SwitchRef>(null);
  const [changes, setChanges] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    if (colorMode === "Dark") {
      themeSwitchRef.current?.setActive(true);
    } else {
      themeSwitchRef.current?.setActive(false);
    }
    if (canSync === true) {
      syncSwitchRef.current?.setActive(true);
    } else {
      syncSwitchRef.current?.setActive(false);
    }
    if (isAdvanceMode === true) {
      advanceModeSwitchRef.current?.setActive(true);
    } else {
      advanceModeSwitchRef.current?.setActive(false);
    }

    if (isFirstLaunch) {
      toast.success("First Launch , Yayy...🎉");
    }

    invoke.readSettings().then((res: any) => {
      setAppId(res.appId!);
    });
  }, []);

  const activateDarkMode = useCallback(() => {
    setChanges(true);
    const isActive = themeSwitchRef.current?.active();

    if (isActive === false) {
      themeSwitchRef.current?.setActive(true);
      setColorMode("Dark");
    } else {
      themeSwitchRef.current?.setActive(false);
      setColorMode("Light");
    }
  }, [themeSwitchRef, setColorMode]);

  const activateSyncing = useCallback(() => {
    setChanges(true);
    const isActive = syncSwitchRef.current?.active();

    if (isActive === false) {
      toast.success("Yayyy...You've Activated Syncing", {
        icon: "🎉",
        duration: 800,
      });
      syncSwitchRef.current?.setActive(true);
      changeSyncState(syncSwitchRef?.current?.active()!);
    } else {
      toast.success("Awww...You've Turned Off Syncing", {
        icon: "😔",
        duration: 800,
      });
      syncSwitchRef.current?.setActive(false);
      changeSyncState(syncSwitchRef?.current?.active()!);
    }
  }, [syncSwitchRef, changeSyncState]);

  const copyAppId = useCallback(() => {
    invoke
      .appendTextToClipBoard(appId!)
      .then(() => {
        toast.success("Copied", { duration: 300 });
      })
      .catch((err: any) => {
        toast.error("Something Wen't Wrong", { duration: 300 });
        invoke.sendErrorData({
          error: err,
          description: "Failed to append to clipboard",
          error_code: ErrorCode.CLIPBOARD_WRITE_ERROR,
          date: new Date().toISOString(),
        });
      });
  }, [appId]);

  const refreshAppId = useCallback(() => {
    setChanges(true);
    toast.success(
      "Changing your App ID means you'll lose access to all your clips and the mobile app will be out of sync",
      { style: { fontSize: "12px", width: "100%" }, duration: 5000 }
    );
    const newAppId = generateAppId();
    setAppId(newAppId);
  }, [setAppId]);

  const saveSettings = useCallback(() => {
    const settingsData: SettingsData = {
      colorMode,
      canSync: syncSwitchRef.current?.active()!,
      color: primaryColor,
      appId: appId!,
      syncUrl: syncUrl,
      isAdvanceMode: isAdvanceMode,
    };
    invoke
      .saveSettings(settingsData)
      .then(() => {
        toast.success("Saved Successfully", { duration: 300 });
      })
      .then(() => {
        setChanges(false);
      })
      .catch((err: any) => {
        invoke.sendErrorData({
          error: err,
          description: "Failed To Save Settings",
          error_code: ErrorCode.FILE_WRITE_ERROR,
          date: new Date().toISOString(),
        });
        toast.error("An Error Occurred", { duration: 300 });
      });
  }, [colorMode, syncSwitchRef, primaryColor, syncUrl, isAdvanceMode]);

  //ensure that clearing syncs as well
  const emptyClipBoard = useCallback(() => {
    db.destroy();
  }, [db]);

  const activateAdvancedMode = useCallback(() => {
    setChanges(true);

    const advancedModeActive = advanceModeSwitchRef.current?.active();

    if (advancedModeActive === false) {
      toast.success("Welcome To Advance Mode", {
        style: { fontSize: "12px" },
        duration: 300,
      });
      advanceModeSwitchRef.current?.setActive(true);
      setAdvanceMode(true);
    } else {
      toast.success("Well ,Seems like your done with advance mode", {
        style: { fontSize: "12px" },
        duration: 300,
      });
      advanceModeSwitchRef.current?.setActive(false);
      setAdvanceMode(false);
    }
  }, [advanceModeSwitchRef, setAdvanceMode]);

  const copySyncUrl = useCallback(() => {
    invoke.appendTextToClipBoard(syncUrl);
    toast.success("Copied Successfully...", { duration: 300 });
  }, [syncUrl, invoke]);

  return (
    <Box
      css={{
        width: "100%",
        height: "100vh",
        background: `${
          colorMode === "Dark" ? "$backgroundDark" : "$background"
        }`,
        padding: "$2",
      }}
    >
      <Box
        css={{
          width: "100%",
          display: "flex",
          height: "10%",
          gap: "10px",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <LinkButton
          css={{
            outlineColor: `${primaryColor}`,
            "&:hover": {
              background: `${primaryColor}`,
              color: "white",
            },
          }}
          to="/"
          variant={colorMode === "Dark" ? "dark" : "light"}
        >
          <FiHome size={13} />
        </LinkButton>
        <LinkButton
          css={{
            outlineColor: `${primaryColor}`,
            "&:hover": {
              background: `${primaryColor}`,
              color: "white",
            },
          }}
          to="/about"
          variant={colorMode === "Dark" ? "dark" : "light"}
        >
          <FiInfo size={14} />
        </LinkButton>
      </Box>
      <Box
        css={{
          height: "94%",
          width: "100%",
          overflowX: "scroll",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
        }}
      >
        <Box>
          <SettingsItem>
            <Paragraph
              css={{
                color: `${colorMode === "Dark" ? "white" : "black"}`,
                fontSize: "13px",
              }}
            >
              Dark Mode
            </Paragraph>
            <Switch onClick={activateDarkMode} ref={themeSwitchRef} />
          </SettingsItem>
          <SettingsItem>
            <Paragraph
              css={{
                color: `${colorMode === "Dark" ? "white" : "black"}`,
                fontSize: "13px",
              }}
            >
              Sync
            </Paragraph>
            <Switch onClick={activateSyncing} ref={syncSwitchRef} />
          </SettingsItem>
          <SettingsItem>
            <Paragraph
              css={{
                color: `${colorMode === "Dark" ? "white" : "black"}`,
                fontSize: "13px",
              }}
            >
              Color
            </Paragraph>
            <Input
              onChange={(e) => {
                setChanges(true);
                setPrimaryColor(e.currentTarget.value);
              }}
              defaultValue={primaryColor}
              css={{
                background: `${
                  colorMode === "Dark" ? "$blackMuted" : "$whiteMuted"
                }`,
                outlineColor: `${primaryColor}`,
                border: "none",
              }}
              type="color"
            />
          </SettingsItem>
          <SettingsItem>
            <Box>
              <Paragraph
                css={{
                  color: `${colorMode === "Dark" ? "white" : "black"}`,
                  fontSize: "10px",
                }}
              >
                My Clips
              </Paragraph>
              <Paragraph
                css={{
                  color: `${colorMode === "Dark" ? "white" : "black"}`,
                  fontSize: "12px",
                }}
              >
                {clipBoardData.length}
              </Paragraph>
            </Box>
            <Button
              onClick={emptyClipBoard}
              css={{
                backgroundColor: `${
                  colorMode === "Dark" ? "$blackMuted" : "$whiteMuted"
                }`,
                color: "$danger",
                "&:hover": {
                  backgroundColor: "$danger",
                  color: "white",
                },
              }}
              title="Empty Clipboard"
            >
              <FiTrash size={13} />
            </Button>
          </SettingsItem>
          <SettingsItem>
            <Paragraph
              css={{
                color: `${colorMode === "Dark" ? "white" : "black"}`,
                fontSize: "13px",
              }}
            >
              Advance Mode
            </Paragraph>
            <Switch onClick={activateAdvancedMode} ref={advanceModeSwitchRef} />
          </SettingsItem>
          {isAdvanceMode === true ? (
            <SettingsItem>
              <Box
                css={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "$2",
                  width: "80%",
                }}
              >
                <Paragraph
                  css={{
                    color: `${colorMode === "Dark" ? "white" : "black"}`,
                    fontSize: "12px",
                  }}
                >
                  Sync Url
                </Paragraph>
                {editing === false ? (
                  <Paragraph
                    css={{ fontSize: "12px", color: `${primaryColor}` }}
                  >
                    {syncUrl}
                  </Paragraph>
                ) : (
                  <Input
                    css={{ padding: "$1", width: "100%" }}
                    variant={colorMode === "Dark" ? "dark" : "light"}
                    type="text"
                    defaultValue={syncUrl}
                    onChange={() => {
                      setChanges(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSyncUrl(e.currentTarget.value);
                      }
                    }}
                  />
                )}
              </Box>
              <Box css={{ display: "flex", gap: "$2" }}>
                <Button
                  onClick={copySyncUrl}
                  css={{
                    color: `${primaryColor}`,
                    background: `${
                      colorMode === "Dark" ? "$blackMuted" : "$whiteMuted"
                    }`,
                    "&:hover": {
                      background: `${primaryColor}`,
                      color: "white",
                    },
                    cursor: "pointer",
                  }}
                  variant={colorMode === "Dark" ? "dark" : "light"}
                >
                  <FiCopy />
                </Button>
                <Button
                  onClick={() => {
                    setEditing(!editing);
                  }}
                  css={{
                    color: "$whiteMuted",
                    background: `${primaryColor}`,
                    "&:hover": {
                      color: "white",
                    },
                    cursor: "pointer",
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FiEdit2 />
                </Button>
              </Box>
            </SettingsItem>
          ) : (
            <></>
          )}
          <Title
            css={{
              fontSize: "14px",
              marginTop: "$2",
              color: `${colorMode === "Dark" ? "white" : "$backgroundDark"}`,
            }}
          >
            AppID
          </Title>
          <Paragraph
            css={{
              fontSize: "10px",
              marginTop: "$1",
              fontStyle: "italic",
              color: `${colorMode === "Light" ? "$blackMuted" : "$whiteMuted"}`,
            }}
          >
            use this to access clips on your mobile app.keep this hidden
            otherwise people will have access to your clips
          </Paragraph>
          <Box
            css={{
              width: "100%",
              background: `${colorMode === "Dark" ? "$blackMuted" : "white"}`,
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "$2",
              marginTop: "$2",
              borderRadius: "5px",
            }}
          >
            <Paragraph
              css={{
                fontSize: "12px",
                color: `${primaryColor}`,
              }}
            >
              {appId}
            </Paragraph>
            <Box css={{ display: "flex", gap: "$2" }}>
              {/* button to copy appId */}
              <Button
                onClick={copyAppId}
                css={{
                  color: `${primaryColor}`,
                  background: `${
                    colorMode === "Dark" ? "$blackMuted" : "$whiteMuted"
                  }`,
                  "&:hover": {
                    background: `${primaryColor}`,
                    color: "white",
                  },
                  cursor: "pointer",
                }}
                variant={colorMode === "Dark" ? "dark" : "light"}
              >
                <FiCopy />
              </Button>
              {/* button to regenerate app id */}
              <Button
                onClick={refreshAppId}
                css={{
                  color: `${primaryColor}`,
                  background: `${
                    colorMode === "Dark" ? "$blackMuted" : "$whiteMuted"
                  }`,
                  "&:hover": {
                    background: `${primaryColor}`,
                    color: "white",
                  },
                  cursor: "pointer",
                }}
                variant={colorMode === "Dark" ? "dark" : "light"}
              >
                <FiRefreshCw />
              </Button>
            </Box>
          </Box>
        </Box>
        <Button
          onClick={saveSettings}
          disabled={changes === false ? true : false}
          css={{
            background: `${changes === false ? "$blackMuted" : primaryColor}`,
            marginTop: "$2",
            cursor: `${changes === false ? "not-allowed" : "pointer"}`,
            outlineColor: `${primaryColor}`,
          }}
        >
          <Paragraph css={{ color: "white" }}>Save Settings</Paragraph>
        </Button>
      </Box>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 700,
          style: {
            padding: "5px",
            width: "200px",
            fontSize: "14px",
            background: `${colorMode === "Dark" ? "black" : "white"}`,
            color: `${colorMode === "Dark" ? "white" : "black"}`,
            fontFamily: "Nunito",
          },
        }}
      />
    </Box>
  );
}

export default Settings;
