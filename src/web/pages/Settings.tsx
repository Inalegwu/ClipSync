import React from "react";
import { Box, LinkButton, Paragraph, Title } from "../component/styled";
import { useColorModeValue } from "../state";
import { FiHome } from "react-icons/fi";
import Switch, { SwitchRef } from "../component/Switch";

function Settings() {
  const { colorMode } = useColorModeValue();
  const switchRef = React.useRef<SwitchRef>(null);

  console.log(switchRef.current?.clicked());

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
      <Box css={{ height: "90%", width: "100%", padding: "$1" }}>
        <Switch ref={switchRef} />
      </Box>
    </Box>
  );
}

export default Settings;
