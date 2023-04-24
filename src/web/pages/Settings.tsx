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
import FrequencyPicker from "../component/FrequencyPicker";

function Settings() {
  const { colorMode, setColorMode } = useColorModeValue();
  const { invoke } = useWindowApi();
  const themeSwitchRef = React.useRef<SwitchRef>(null);
  const syncSwitchRef = React.useRef<SwitchRef>(null);

  React.useEffect(() => {
    if (colorMode === "Dark") {
      themeSwitchRef.current?.setActive(true);
    } else {
      themeSwitchRef.current?.setActive(false);
    }
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
      syncSwitchRef.current?.setActive(true);
    } else {
      syncSwitchRef.current?.setActive(false);
    }
  }

  function saveSettings() {
    const settingsData: SettingsData = {
      colorMode,
      syncFrequency: new Date(),
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
              }}
            >
              Sync
            </Paragraph>
            <Switch onClick={activateSyncing} ref={syncSwitchRef} />
          </SettingsItem>
          <SettingsItem>
            <Paragraph
              css={{ color: `${colorMode === "Dark" ? "white" : "black"}` }}
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
              css={{ color: `${colorMode === "Dark" ? "white" : "black"}` }}
            >
              Sync Frequency
            </Paragraph>
            <FrequencyPicker />
          </SettingsItem>
        </Box>
        <Button
          onClick={saveSettings}
          css={{
            background: "$primary",
            marginTop: "$2",
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
            background: `${colorMode === "Dark" ? "black" : "white"}`,
            color: `${colorMode === "Dark" ? "white" : "black"}`,
          },
        }}
      />
    </Box>
  );
}

export default Settings;
