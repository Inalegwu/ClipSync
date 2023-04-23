import { styled } from "../../stitches.config";

export const Button = styled("button", {
  borderRadius: "5px",
  padding: "$2",
  appearance: "none",
  border: "none",
  outlineColor: "$primary",
  display: "flex",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.2s ease-in-out",

  variants: {
    variant: {
      dark: {
        background: "$blackMuted",
        color: "$background",
      },
      light: {
        background: "white",
        color: "$backgroundDark",
      },
    },
  },
});
