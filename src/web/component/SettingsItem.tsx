import React from "react";
import { Box } from "./styled";
import { useColorModeValue } from "../state";

export interface SettingsItemProps {
  children?: React.ReactNode;
}

export function SettingsItem({ children }: SettingsItemProps) {
  const { colorMode } = useColorModeValue();
  return (
    <Box
      css={{
        background: `${colorMode === "Dark" ? "$blackMuted" : "white"}`,
        width: "100%",
        borderRadius: "5px",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "$2",
        marginTop: "$2",
      }}
    >
      {children}
    </Box>
  );
}
