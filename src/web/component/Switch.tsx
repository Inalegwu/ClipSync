import React from "react";
import { Box } from "./styled";
import { useColorModeValue, usePrimaryColor } from "../state";

// CUSTOM SWITCH COMPONENT
// EXPOSES THE ACTIVATE STATE
// OF THE SWITCH AND THE HANDLER FOR CHANGING THIS
// STATE.IT WAS WHILE CREATING THIS COMPONENT I
// REALIZED HOW FAR I HAD COME IN REACT

// TODO add a way to add with and height to the switch
// so it can be used elsewhere

export interface SwitchProps {
  onClick?: () => void;
}

export interface SwitchRef {
  active: () => boolean;
  setActive: (state: boolean) => void;
}

const Switch = React.forwardRef<SwitchRef, SwitchProps>(({ onClick }, ref) => {
  const { primaryColor } = usePrimaryColor();
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
        outlineColor: `${primaryColor}`,
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
          background: `${primaryColor}`,
          transition: "0.4 ease-in-out",
        }}
      ></Box>
    </Box>
  );
});

export default Switch;
