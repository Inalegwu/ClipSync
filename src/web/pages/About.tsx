import React from "react";
import {
  Box,
  Button,
  LinkButton,
  Paragraph,
  Title,
} from "@web/component/styled";
import { useColorModeValue, usePrimaryColor } from "@web/state";
import {
  FiArrowLeft,
  FiGithub,
  FiGlobe,
  FiHome,
  FiTwitter,
} from "react-icons/fi";
import { useWindowApi } from "@web/hooks";

/**
 *
 * STATIC ABOUT PAGE
 * WON'T CHANGE MUCH IN COMING DAYS
 *
 */
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
          gap: "$2",
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
          to="/settings"
        >
          <FiArrowLeft size={14} />
        </LinkButton>
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
            📱💻Have you ever had to type something you saw in an article into
            your phone , maybe as a text message ? If yes then you've felt my
            pain before.Well ClipSync makes sure you don't have to type it out
            manually, just Copy it on your PC or your Phone and have it every
            where instantly...Yeah it's realtime 🤸‍♂️ as long as you want it to be
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
            🎉Yes it is and I plan on making sure it stays that way. You can
            always donate if you enjoy the software that much.
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
            🧑🏾‍👩🏼‍🧒🏽It's for everyone whose every felt the pain of manually
            typing out some information from their laptop screen into their
            phone or vice versa
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
            Cloud Backups
          </Title>
          <Paragraph
            css={{
              fontSize: "12px",
              color: `${
                colorMode === "Dark" ? "$background" : "$backgroundDark"
              }`,
            }}
          >
            ☁️Save your clipboard data to the cloud so you can always have them.
            And if you want to leave ClipSync behind , you can always export
            them and use them somewhere else
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
              background: `${colorMode === "Dark" ? "$blackMuted" : "white"}`,
              color: `${primaryColor}`,
              cursor: "pointer",
              outlineColor: `${primaryColor}`,
              "&:hover": {
                background: `${primaryColor}`,
                color: "white",
              },
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
              background: `${colorMode === "Dark" ? "$blackMuted" : "white"}`,
              color: `${primaryColor}`,
              cursor: "pointer",
              outlineColor: `${primaryColor}`,
              "&:hover": {
                background: `${primaryColor}`,
                color: "white",
              },
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
              background: `${colorMode === "Dark" ? "$blackMuted" : "white"}`,
              color: `${primaryColor}`,
              cursor: "pointer",
              outlineColor: `${primaryColor}`,
              "&:hover": {
                background: `${primaryColor}`,
                color: "white",
              },
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
