import React from "react";
import { Box, Button, Paragraph } from "./styled";
import toast from "react-hot-toast";
import {
  useClipBoard,
  useColorModeValue,
  usePrimaryColor,
  useSyncState,
} from "../state";
import { FiCopy, FiDelete } from "react-icons/fi";
import useWindowApi from "../hooks/useWindowApi";
import type { ClipBoardItem, Row } from "../../shared/utils/types";
import db from "../../shared/utils/db";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export interface ClipItemProps {
  data: {
    doc: ClipBoardItem;
  };
}

function ClipItem({ data }: ClipItemProps) {
  const { invoke } = useWindowApi();
  const { colorMode } = useColorModeValue();
  const { primaryColor } = usePrimaryColor();

  async function copy() {
    await invoke.appendToClipBoard(data.doc.data);
    toast.success("Copied", {
      style: {
        width: "200px",
      },
    });
  }

  const parsedDate = Date.parse(data.doc.dateCreated);
  const relativeDate = dayjs(parsedDate).fromNow(true);

  function deleteClip() {
    db.remove({ _id: data.doc._id, _rev: data.doc._rev! })
      .then(() => {
        toast.success("Deleted", {
          style: {
            width: "200px",
          },
        });
      })
      .catch((err) => {
        toast.error(err);
      });
  }

  return (
    <Box
      css={{
        background: `${colorMode === "Dark" ? "$blackMuted" : "white"}`,
        borderRadius: "5px",
        marginTop: "$1",
        marginBottom: "$1",
        padding: "$2",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* data and clipboard data */}
      <Box
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "$1",
          cursor: "pointer",
          width: "80%",
          wordWrap: "break-word",
        }}
      >
        <Paragraph
          onClick={copy}
          css={{
            color: `${colorMode === "Dark" ? "white" : "black"}`,
            fontSize: "12px",
            "&:hover": {
              color: `${colorMode === "Dark" ? "$whiteMuted" : "$blackMuted"}`,
            },
          }}
        >
          {data.doc.data}
        </Paragraph>
        <Paragraph
          css={{
            fontSize: "10px",
            color: `${colorMode === "Dark" ? "$whiteMuted" : "$blackMuted"}`,
          }}
        >
          {relativeDate} ago
        </Paragraph>
      </Box>
      {/* actions */}
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
