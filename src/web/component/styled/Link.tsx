import { styled } from "../../stitches.config";
import { Link } from "react-router-dom";

export const LinkButton = styled(Link, {
  borderRadius: "5px",
  padding: "$2",
  appearance: "none",
  border: "none",
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
