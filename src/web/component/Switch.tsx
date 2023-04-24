import React from "react";
import { Box } from "./styled";
import { useColorModeValue } from "../state";

export interface SwitchProps {
  size?: number;
  onClick?: () => void;
}

export interface SwitchRef {
  active: () => boolean;
  setActive: (state: boolean) => void;
}

const Switch = React.forwardRef<SwitchRef, SwitchProps>(
  ({ size, onClick }, ref) => {
    const { colorMode } = useColorModeValue();
    const [isActive, setIsActive] = React.useState<boolean>(false);

    const active = React.useCallback(() => {
      return isActive;
    }, [isActive]);

    const setActive = React.useCallback((state: boolean) => {
      setIsActive(state);
    }, []);

    React.useImperativeHandle(ref, () => ({ active, setActive }));

    return (
      <Box
        onClick={onClick}
        css={{
          height: "25px",
          width: "45px",
          padding: "$1",
          borderRadius: "9999px",
          display: "inline-block",
          background: `${colorMode === "Dark" ? "black" : "$whiteMuted"}`,
          outlineColor: "$primary",
        }}
      >
        <Box
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
  }
);

export default Switch;
