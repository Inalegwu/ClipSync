import { createStitches } from "@stitches/react";
export const { styled, config } = createStitches({
  theme: {
    colors: {
      background: "#f1f1f1",
      backgroundDark: "#000000",
      whiteMuted: "#e0e0e09d",
      blackMuted: "#161515b7",
      primary: "#ff7c01",
      danger: "#d82828",
      success: "#29cc6d",
    },
    space: {
      1: "4px",
      2: "8px",
      3: "10px",
      4: "12px",
      5: "16px",
      6: "20px",
      7: "24px",
    },
  },
});
