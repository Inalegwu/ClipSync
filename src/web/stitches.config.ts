import { createStitches } from "@stitches/react";

export const { styled } = createStitches({
  theme: {
    colors: {
      background: "#cccccc",
      backgroundDark: "#000000",
      backgroundMuted: "#ececec69",
      backgroundDarkMuted: "#00000088",
      primary: "#3a52a1",
    },
    space: {
      1: "5px",
      2: "10px",
      3: "12px",
      4: "15px",
      5: "18px",
      6: "20px",
      7: "24px",
      8: "28px",
    },
  },
});
