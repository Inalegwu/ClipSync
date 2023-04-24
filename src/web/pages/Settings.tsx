import React from "react";
import {
  Box,
  Button,
  Input,
  LinkButton,
  Paragraph,
  Title,
} from "../component/styled";
import { useColorModeValue } from "../state";
import { FiHome } from "react-icons/fi";
import Switch, { SwitchRef } from "../component/Switch";
import { SettingsItem } from "../component/SettingsItem";
import useWindowApi from "../hooks/useWindowApi";
import { SettingsData } from "../../shared/utils/types";
import { Toaster, toast } from "react-hot-toast";
import FrequencyPicker, {
  FrequencyPickerRef,
} from "../component/FrequencyPicker";
import { useSyncState } from "../state/syncState";

function Settings() {
  const { colorMode, setColorMode } = useColorModeValue();
  const { syncState, changeSyncFrequency, changeSyncState, syncFrequency } =
    useSyncState();
  const { invoke } = useWindowApi();
  const themeSwitchRef = React.useRef<SwitchRef>(null);
  const syncSwitchRef = React.useRef<SwitchRef>(null);
  const frequencyRef = React.useRef<FrequencyPickerRef>(null);

  React.useEffect(() => {
    if (colorMode === "Dark") {
      themeSwitchRef.current?.setActive(true);
    } else {
      themeSwitchRef.current?.setActive(false);
    }
    if (syncState === true) {
      syncSwitchRef.current?.setActive(true);
    } else {
      syncSwitchRef.current?.setActive(false);
    }
    console.log(syncFrequency);
    frequencyRef.current?.setOption(syncFrequency);
  }, []);

  function activateDarkMode() {
    const isActive = themeSwitchRef.current?.active();

    console.log(isActive);

    if (isActive === false) {
      themeSwitchRef.current?.setActive(true);
      setColorMode("Dark");
    } else {
      themeSwitchRef.current?.setActive(false);
      setColorMode("Light");
    }
  }

  function activateSyncing() {
    const isActive = syncSwitchRef.current?.active();

    console.log(isActive);

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
  }

  function setFrequency(value: any) {
    frequencyRef.current?.setOption(value);
    changeSyncFrequency(value);
  }

  function saveSettings() {
    const settingsData: SettingsData = {
      colorMode,
      syncFrequency: frequencyRef.current?.option()!,
      syncState: syncSwitchRef.current?.active()!,
    };
    invoke
      .saveSettings(settingsData)
      .then(() => {
        toast.success("Saved Successfully");
      })
      .catch((err) => {
        toast.error("An Error Occurred");
      });
  }

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
          height: "10%",
          width: "100%",
          display: "flex",
          gap: "10px",
          justifyContent: "flex-start",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <LinkButton to="/" variant={colorMode === "Dark" ? "dark" : "light"}>
          <FiHome size={13} />
        </LinkButton>
      </Box>
      <Box
        css={{
          height: "90%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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
              css={{
                background: `${colorMode === "Dark" ? "$blackMuted" : "white"}`,
              }}
              type="color"
            />
          </SettingsItem>
          <SettingsItem>
            <Paragraph
              css={{
                color: `${colorMode === "Dark" ? "white" : "black"}`,
                fontSize: "13px",
              }}
            >
              Sync Frequency
            </Paragraph>
            <FrequencyPicker onChange={setFrequency} ref={frequencyRef} />
          </SettingsItem>
        </Box>
        <Button
          onClick={saveSettings}
          css={{
            background: "$primary",
            marginTop: "$2",
            cursor: "pointer",
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
