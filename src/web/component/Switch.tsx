import React from "react";
import { Box } from "./styled";
import { useColorModeValue } from "../state";

export interface SwitchProps {
  size?: number;
}

export interface SwitchRef {
  clicked: () => boolean;
}

const Switch = React.forwardRef<SwitchRef, SwitchProps>(({ size }, ref) => {
  const { colorMode } = useColorModeValue();
  const [isActive, setIsActive] = React.useState<boolean>(false);

  const clicked = React.useCallback(() => {
    return isActive;
  }, []);

  React.useImperativeHandle(ref, () => ({ clicked }));

  return (
    <Box
      css={{
        height: "25px",
        width: "45px",
        padding: "$1",
        borderRadius: "9999px",
        display: "inline-block",
        background: `${colorMode === "Dark" ? "$blackMuted" : "white"}`,
      }}
    >
      <Box
        onClick={() => {
          setIsActive(!isActive);
        }}
        css={{
          position: "relative",
          left: ` ${isActive === true ? "50%" : "0"}`,
          cursor: "pointer",
          width: "45%",
          height: "100%",
          borderRadius: "100px",
          background: "$primary",
          transition: "0.4 ease-in-out",
        }}
      ></Box>
    </Box>
  );
});

export default Switch;
