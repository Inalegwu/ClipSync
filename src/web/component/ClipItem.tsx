import React from "react";
import { Box, Button, Paragraph } from "./styled";
import toast from "react-hot-toast";
import { useColorModeValue, usePrimaryColor } from "../state";
import { FiCopy, FiTrash } from "react-icons/fi";
import {
  IoIosLaptop,
  IoMdPhoneLandscape,
  IoMdPhonePortrait,
} from "react-icons/io";
import useWindowApi from "../hooks/useWindowApi";
import {
  ErrorCode,
  type ClipBoardItem,
  type Row,
} from "../../shared/utils/types";
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
    await invoke.appendTextToClipBoard(data.doc.data);
    toast.success("Copied", {
      style: {
        width: "200px",
      },
      duration: 300,
    });
  }

  const parsedDate = Date.parse(data.doc.dateCreated);
  const relativeDate = dayjs(parsedDate).fromNow();

  function deleteClip() {
    db.remove({ _id: data.doc._id, _rev: data.doc._rev! })
      .then(() => {
        toast.success("Deleted", {
          style: {
            width: "200px",
          },
          duration: 300,
        });
      })
      .catch((err) => {
        invoke.sendErrorData({
          date: new Date().toISOString(),
          description: "failed to delete clip",
          error: err,
          error_code: ErrorCode.CLIPBOARD_DELETE_ERROR,
          item: `ID:${data.doc._id} :: ${data.doc._rev}`,
        });
        toast.error("Something Went Wrong", { duration: 300 });
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
            transition: "0.12s ease-in-out",
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
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            gap: "$1",
          }}
        >
          {data.doc.device?.toLowerCase() === "laptop" ? (
            <IoIosLaptop size={12} />
          ) : data.doc.device?.toLowerCase() === "phone" ? (
            <IoMdPhonePortrait size={12} />
          ) : (
            <></>
          )}
          {relativeDate}
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
          <FiTrash size={13} />
        </Button>
      </Box>
    </Box>
  );
}

export default ClipItem;
