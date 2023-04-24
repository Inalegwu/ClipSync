import React from "react";
import { Box, Paragraph, Select } from "./styled";
import { useColorModeValue } from "../state";

export interface FrequencyPickerRefProps {
  option: () => string;
}

const FrequencyPicker = React.forwardRef<FrequencyPickerRefProps>(() => {
  const { colorMode } = useColorModeValue();

  return (
    <Select
      css={{
        background: `${colorMode === "Dark" ? "black" : "$whiteMuted"}`,
        width: "100px",
        height: "25px",
        padding: "$1",
        color: `${colorMode === "Dark" ? "white" : "black"}`,
      }}
    >
      <option>Everyday</option>
      <option>1 Day</option>
      <option>2 Day</option>
    </Select>
  );
});

export default FrequencyPicker;
