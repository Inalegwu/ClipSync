import React from "react";
import { Box, Button, Paragraph } from "./styled";
import toast from "react-hot-toast";
import { useClipBoard, useColorModeValue, usePrimaryColor } from "../state";
import { FiCopy, FiDelete } from "react-icons/fi";
import useWindowApi from "../hooks/useWindowApi";
import { ClipBoardItem } from "../../shared/utils/types";
import db from "../../shared/utils/db";

export interface ClipItemProps {
  data: ClipBoardItem;
}

function ClipItem({ data }: ClipItemProps) {
  const { invoke } = useWindowApi();
  const { colorMode } = useColorModeValue();
  const { primaryColor } = usePrimaryColor();
  const { deleteClipBoardItem } = useClipBoard();

  async function copy() {
    // await invoke.appendToClipBoard(data);
    toast.success("Copied", {
      style: {
        width: "200px",
      },
    });
  }

  function deleteClip() {
    deleteClipBoardItem(data.id);
    toast.success("Deleted", {
      style: {
        width: "200px",
      },
    });
  }

  return (
    <Box
      css={{
        background: `${colorMode === "Dark" ? "$blackMuted" : "white"}`,
        borderRadius: "5px",
        marginTop: "$2",
        padding: "$2",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Paragraph
        css={{
          color: `${colorMode === "Dark" ? "white" : "black"}`,
          fontSize: "13px",
        }}
      >
        {data.data}
      </Paragraph>
      <Box css={{ display: "flex", gap: "$1" }}>
        <Button
          onClick={copy}
          css={{
            background: `${colorMode === "Dark" ? "black" : "$whiteMuted"}`,
            color: `${primaryColor}`,
            "&:hover": {
              background: `${primaryColor}`,
              color: "white",
            },
            outlineColor: `${primaryColor}`,
          }}
        >
          <FiCopy size={13} />
        </Button>
        <Button
          onClick={deleteClip}
          css={{
            background: `${colorMode === "Dark" ? "black" : "$whiteMuted"}`,
            color: "$danger",
            "&:hover": {
              background: "$danger",
              color: "white",
            },
            outlineColor: `${primaryColor}`,
          }}
        >
          <FiDelete size={13} />
        </Button>
      </Box>
    </Box>
  );
}

export default ClipItem;
