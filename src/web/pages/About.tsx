import React from "react";
import { Box, Button, LinkButton, Paragraph, Title } from "../component/styled";
import { useColorModeValue, usePrimaryColor } from "../state";
import { FiGithub, FiGlobe, FiHome, FiTwitter } from "react-icons/fi";
import { Link } from "react-router-dom";
import useWindowApi from "../hooks/useWindowApi";

function About() {
  const { invoke } = useWindowApi();
  const { colorMode } = useColorModeValue();
  const { primaryColor } = usePrimaryColor();
  return (
    <Box
      css={{
        width: "100%",
        height: "100vh",
        background: `${
          colorMode === "Dark" ? "$backgroundDark" : "$background"
        }`,
        padding: "$2",
      }}
    >
      <Box
        css={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "10%",
        }}
      >
        <LinkButton
          css={{
            outlineColor: `${primaryColor}`,
            "&:hover": {
              background: `${primaryColor}`,
              color: "white",
            },
          }}
          variant={colorMode === "Dark" ? "dark" : "light"}
          to="/"
        >
          <FiHome size={14} />
        </LinkButton>
      </Box>
      <Box
        css={{
          width: "100%",
          height: "90%",
          overflowY: "scroll",
          display: "flex",
          gap: "$2",
          flexDirection: "column",
        }}
      >
        <Box
          css={{
            marginTop: "$2",
            background: `${colorMode === "Dark" ? "$blackMuted" : "white"}`,
            display: "flex",
            flexDirection: "column",
            padding: "$2",
            borderRadius: "5px",
            gap: "5px",
          }}
        >
          <Title
            css={{
              fontSize: "15px",
              color: `${
                colorMode === "Dark" ? "$background" : "$backgroundDark"
              }`,
            }}
          >
            What is ClipSync ?
          </Title>
          <Paragraph
            css={{
              fontSize: "12px",
              color: `${
                colorMode === "Dark" ? "$background" : "$backgroundDark"
              }`,
            }}
          >
            📱💻Well I work with my phone and my laptop a lot and I do a lot of
            copying and pasting and so I decided to build ClipSync to give me
            access to whatever I copy on my laptop or phone in realtime.Did I
            mention it was realtime 🤸‍♂️?
          </Paragraph>
        </Box>
        <Box
          css={{
            background: `${colorMode === "Dark" ? "$blackMuted" : "white"}`,
            display: "flex",
            flexDirection: "column",
            padding: "$2",
            borderRadius: "5px",
            gap: "5px",
          }}
        >
          <Title
            css={{
              fontSize: "15px",
              color: `${
                colorMode === "Dark" ? "$background" : "$backgroundDark"
              }`,
            }}
          >
            Is ClipSync Free ?
          </Title>
          <Paragraph
            css={{
              fontSize: "12px",
              color: `${
                colorMode === "Dark" ? "$background" : "$backgroundDark"
              }`,
            }}
          >
            🎉Yes it is and I plan on making sure it stays that way.But you can
            donate if you want to
          </Paragraph>
        </Box>
        <Box
          css={{
            background: `${colorMode === "Dark" ? "$blackMuted" : "white"}`,
            display: "flex",
            flexDirection: "column",
            padding: "$2",
            borderRadius: "5px",
            gap: "5px",
          }}
        >
          <Title
            css={{
              fontSize: "15px",
              color: `${
                colorMode === "Dark" ? "$background" : "$backgroundDark"
              }`,
            }}
          >
            Who is ClipSync For ?
          </Title>
          <Paragraph
            css={{
              fontSize: "12px",
              color: `${
                colorMode === "Dark" ? "$background" : "$backgroundDark"
              }`,
            }}
          >
            🧑🏾‍👩🏼‍🧒🏽It's for everyone. So you don't have to type everything you
            see in your laptop into your phone just copy it and have it
            available when you go into your phone
          </Paragraph>
        </Box>
        <Box
          css={{
            background: `${colorMode === "Dark" ? "$blackMuted" : "white"}`,
            display: "flex",
            flexDirection: "column",
            padding: "$2",
            borderRadius: "5px",
            gap: "5px",
          }}
        >
          <Title
            css={{
              fontSize: "15px",
              color: `${
                colorMode === "Dark" ? "$background" : "$backgroundDark"
              }`,
            }}
          >
            I Don't want any Syncing . just let me see my clipboard
          </Title>
          <Paragraph
            css={{
              fontSize: "12px",
              color: `${
                colorMode === "Dark" ? "$background" : "$backgroundDark"
              }`,
            }}
          >
            😔Theres an option for that in the settings.You can treat ClipSync
            as a standalone Clipboard manager if you like
          </Paragraph>
        </Box>
        <Box
          css={{
            background: `${colorMode === "Dark" ? "$blackMuted" : "white"}`,
            display: "flex",
            flexDirection: "column",
            padding: "$2",
            borderRadius: "5px",
            gap: "5px",
          }}
        >
          <Title
            css={{
              fontSize: "15px",
              color: `${
                colorMode === "Dark" ? "$background" : "$backgroundDark"
              }`,
            }}
          >
            How About Images
          </Title>
          <Paragraph
            css={{
              fontSize: "12px",
              color: `${
                colorMode === "Dark" ? "$background" : "$backgroundDark"
              }`,
            }}
          >
            😉Images are at the top of the priority list and you can expect them
            soon
          </Paragraph>
        </Box>
        <Box
          css={{
            width: "100%",
            padding: "$2",
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            gap: "$3",
            borderRadius: "5px",
          }}
        >
          <Button
            css={{
              background: `${
                colorMode === "Dark" ? "$blackMuted" : "$whiteMuted"
              }`,
              color: `${primaryColor}`,
              cursor: "pointer",
              outlineColor: `${primaryColor}`,
            }}
            onClick={() => {
              invoke.openLinkInBrowserWindow("https://twitter.com/diff_dev");
            }}
            variant={colorMode === "Dark" ? "dark" : "light"}
          >
            <FiTwitter />
          </Button>
          <Button
            css={{
              background: `${
                colorMode === "Dark" ? "$blackMuted" : "$whiteMuted"
              }`,
              color: `${primaryColor}`,
              cursor: "pointer",
              outlineColor: `${primaryColor}`,
            }}
            onClick={() => {
              invoke.openLinkInBrowserWindow("https://github.com/Inalegwu");
            }}
            variant={colorMode === "Dark" ? "dark" : "light"}
          >
            <FiGithub />
          </Button>
          <Button
            css={{
              background: `${
                colorMode === "Dark" ? "$blackMuted" : "$whiteMuted"
              }`,
              color: `${primaryColor}`,
              cursor: "pointer",
              outlineColor: `${primaryColor}`,
            }}
            onClick={() => {
              invoke.openLinkInBrowserWindow(
                "https://ikwue-inalegwu.vercel.app/"
              );
            }}
            variant={colorMode === "Dark" ? "dark" : "light"}
          >
            <FiGlobe />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default About;
