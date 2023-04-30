import { styled } from "../../stitches.config";

export const Input = styled("input", {
  outline: "none",
  borderRadius: "5px",
  padding: "15px",
  border: "0.1px solid #3838383c",

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
