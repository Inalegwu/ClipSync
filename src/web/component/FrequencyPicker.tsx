import React from "react";
import { Box, Paragraph, Select } from "./styled";
import { useColorModeValue, usePrimaryColor } from "../state";
import { SyncFrequency } from "../state/syncState";

export interface FrequencyPickerProps {
  onChange: (value: string) => void;
}

export interface FrequencyPickerRef {
  option: () => SyncFrequency;
  setOption: (option: SyncFrequency) => void;
}

const syncOptions = [
  "DAILY",
  "FREQUENTLY",
  "EVERY TWO DAYS",
  "EVERY OTHER DAY",
];

const FrequencyPicker = React.forwardRef<
  FrequencyPickerRef,
  FrequencyPickerProps
>(({ onChange }, ref) => {
  const { primaryColor } = usePrimaryColor();
  const { colorMode } = useColorModeValue();
  const [frequencyOption, setFrequencyOption] =
    React.useState<SyncFrequency>("DAILY");

  const option = React.useCallback(() => {
    return frequencyOption;
  }, [frequencyOption]);

  const setOption = React.useCallback((option: SyncFrequency) => {
    setFrequencyOption(option);
  }, []);

  React.useImperativeHandle(ref, () => ({ option, setOption }));

  return (
    <Select
      onChange={(e) => {
        onChange(e.currentTarget.value);
      }}
      css={{
        background: `${colorMode === "Dark" ? "black" : "$whiteMuted"}`,
        width: "100px",
        height: "25px",
        padding: "$1",
        fontSize: "11px",
        color: `${colorMode === "Dark" ? "white" : "black"}`,
        outlineColor: `${primaryColor}`,
      }}
    >
      {syncOptions.map((option, idx) => {
        return (
          <option style={{ fontSize: "11px" }} value={option} key={idx}>
            {option}
          </option>
        );
      })}
    </Select>
  );
});

export default FrequencyPicker;
