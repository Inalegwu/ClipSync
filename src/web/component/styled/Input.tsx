import { styled } from "../../stitches.config";

export const Input = styled("input", {
  border: "none",
  outlineColor: "$primary",
  borderRadius: "5px",
  padding: "10px",

  variants: {
    variant: {
      dark: {
        background: "$blackMuted",
        color: "white",
      },
      light: {
        background: "white",
        color: "$backgroundDark",
      },
    },
  },
});
