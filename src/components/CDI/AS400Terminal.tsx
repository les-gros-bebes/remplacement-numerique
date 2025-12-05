import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Tetris from "./Tetris";
import Windows95 from "./Windows95";

type DialogueStep = {
  id: string;
  speaker?: string;
  text: string;
  choices?: { key: string; label: string; nextId: string }[];
  nextId?: string; // Auto advance after text
};

import dialogueData from "../../data/cdi_dialogues.json";

const DIALOGUE_TREE: Record<string, DialogueStep> = dialogueData;

const FALLBACK_STEP: DialogueStep = {
  id: "system_access",
  text: "SYSTEM ACCESS...",
  choices: [],
};

const AS400Terminal: React.FC = () => {
  const [currentStepId, setCurrentStepId] = useState("start");
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [inputBuffer, setInputBuffer] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showTetris, setShowTetris] = useState(false);
  const [showWin95, setShowWin95] = useState(false);

  const step = DIALOGUE_TREE[currentStepId] || FALLBACK_STEP;

  // Colors based on AS400 screenshot
  const cGreen = "#00FF00";
  const cCyan = "#00FFFF";
  const cWhite = "#FFFFFF";
  const cBlack = "#000000";
  const cBlue = "#5555FF"; // For the status bar background

  // Typing effect
  useEffect(() => {
    setTypedText("");
    setIsTyping(true);
    setInputBuffer("");
    setErrorMsg("");

    let index = 0;
    const fullText = step.text;

    const interval = setInterval(() => {
      index++;
      setTypedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [step]);

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showTetris || showWin95) return;

      // Rick Roll Easter Egg
      if (e.key === "F3") {
        e.preventDefault();
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        return;
      }

      // Windows 95 Easter Egg
      if (e.key === "F4") {
        e.preventDefault();
        setShowWin95(true);
        return;
      }

      if (isTyping) {
        // Instant finish typing
        setIsTyping(false);
        setTypedText(step.text);
        return;
      }

      // Handle Enter
      if (e.key === "Enter") {
        if (!step.choices && step.nextId) {
          setCurrentStepId(step.nextId);
          return;
        }

        if (step.choices) {
          const choice = step.choices.find((c) => c.key === inputBuffer);
          if (choice) {
            setCurrentStepId(choice.nextId);
            setInputBuffer("");
            setErrorMsg("");
          } else {
            setErrorMsg("Option invalide");
            setInputBuffer("");
          }
        }
        return;
      }

      // Handle Backspace
      if (e.key === "Backspace") {
        setInputBuffer((prev) => prev.slice(0, -1));
        setErrorMsg("");
        return;
      }

      // Handle numeric input (assuming choices are numbers)
      if (/^[0-9]$/.test(e.key)) {
        if (inputBuffer.length < 2) {
          // Limit length
          setInputBuffer((prev) => prev + e.key);
          setErrorMsg("");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, isTyping, inputBuffer, showTetris, showWin95]);

  // Animation state
  const [showErrorSequence, setShowErrorSequence] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [terminalColor, setTerminalColor] = useState("#00FF00"); // Default Green
  const [hintGlitch, setHintGlitch] = useState(false);

  // Glitch effect for hints
  useEffect(() => {
    const triggerGlitch = () => {
      setHintGlitch(true);
      setTimeout(() => setHintGlitch(false), 300);

      // Schedule next glitch
      const nextDelay = Math.random() * 4000 + 3000; // 3-7 seconds
      setTimeout(triggerGlitch, nextDelay);
    };

    const timer = setTimeout(triggerGlitch, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentStepId === "system_access") {
      const timer = setTimeout(() => {
        setShowErrorSequence(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentStepId]);

  // Countdown and redirect
  useEffect(() => {
    if (showErrorSequence) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        window.location.href = "/home";
      }
    }
  }, [showErrorSequence, countdown]);

  if (showErrorSequence) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "#8B0000", // Dark Red
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Courier New', Courier, monospace",
          color: "white",
          p: 4,
          border: "2px solid #fff",
          position: "relative",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 2,
            textTransform: "uppercase",
            animation: "blink 0.2s infinite",
          }}
        >
          UNE ERREUR CRITIQUE EST SURVENUE
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
            textShadow: "0 0 10px white",
          }}
        >
          CRITICAL ERROR
        </Typography>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            border: "2px solid white",
            p: 2,
            mb: 4,
            bgcolor: "red",
          }}
        >
          BLACKROCK SYSTEMS DOWN
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          System will reboot in {countdown}...
        </Typography>

        <style>
          {`
            @keyframes blink {
              0% { opacity: 1; }
              50% { opacity: 0; }
              100% { opacity: 1; }
            }
          `}
        </style>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "#c0c0c0", // Windows window frame color
        fontFamily: "'Courier New', Courier, monospace",
        display: "flex",
        flexDirection: "column",
        border: "2px solid #fff",
        boxShadow: "2px 2px 5px rgba(0,0,0,0.5)",
        p: "2px",
      }}
    >
      {/* Window Title Bar */}
      <Box
        sx={{
          background: "linear-gradient(to right, #000080, #1084d0)",
          color: "white",
          p: "2px 4px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "12px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4e/IBM_i_Access_Client_Solutions_logo.png"
            alt="icon"
            style={{ height: 12, filter: "grayscale(100%)" }}
          />
          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            Session A - [24 x 80]
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: "#c0c0c0",
              border: "1px solid white",
              boxShadow: "outset 1px 1px black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              color: "black",
            }}
          >
            _
          </Box>
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: "#c0c0c0",
              border: "1px solid white",
              boxShadow: "outset 1px 1px black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              color: "black",
            }}
          >
            □
          </Box>
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: "#c0c0c0",
              border: "1px solid white",
              boxShadow: "outset 1px 1px black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              color: "black",
            }}
          >
            x
          </Box>
        </Box>
      </Box>

      {/* Menu Bar */}
      <Box
        sx={{
          bgcolor: "#c0c0c0",
          px: 1,
          py: 0.5,
          borderBottom: "1px solid #808080",
          display: "flex",
          gap: 2,
        }}
      >
        {[
          "File",
          "Edit",
          "View",
          "Communication",
          "Actions",
          "Window",
          "Help",
        ].map((item) => (
          <Typography
            key={item}
            variant="caption"
            onClick={() => {
              if (item === "View") {
                // Color cycle easter egg
                const colors = ["#00FF00", "#FFB000", "#FFFFFF", "#00FFFF"];
                const nextColor =
                  colors[(colors.indexOf(terminalColor) + 1) % colors.length];
                setTerminalColor(nextColor);
              } else if (item === "Window") {
                // Duplicate session easter egg
                alert(
                  "Session duplication failed: Maximum sessions reached (1)."
                );
              } else if (item === "Actions") {
                setShowTetris(true);
              }
            }}
            sx={{
              color: item === "Actions" && hintGlitch ? "#00FF00" : "black",
              bgcolor:
                item === "Actions" && hintGlitch ? "black" : "transparent",
              cursor: "pointer",
              "&:hover": { bgcolor: "#000080", color: "white" },
              px: 0.5,
              fontWeight: item === "Actions" && hintGlitch ? "bold" : "normal",
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>

      {/* Toolbar (Icons placeholder) */}
      <Box
        sx={{
          bgcolor: "#c0c0c0",
          px: 1,
          py: 0.5,
          borderBottom: "1px solid #808080",
          height: 24,
          display: "flex",
          gap: 1,
        }}
      >
        {/* Fake icons */}
        {[...Array(8)].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 16,
              height: 16,
              bgcolor: "#e0e0e0",
              border: "1px solid #808080",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
            }}
          ></Box>
        ))}
      </Box>

      {/* Terminal Screen */}
      <Box
        sx={{
          flex: 1,
          bgcolor: cBlack,
          color: cGreen,
          p: 2,
          position: "relative",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          fontSize: "16px",
          lineHeight: "1.2",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none", // Firefox
        }}
      >
        {showTetris && <Tetris onClose={() => setShowTetris(false)} />}
        {showWin95 && <Windows95 onClose={() => setShowWin95(false)} />}
        {!showTetris && !showWin95 && (
          <>
            {/* Header Info */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
                color: cWhite,
              }}
            >
              <Typography sx={{ fontFamily: "inherit" }}>
                Job: ADMINP
              </Typography>
              <Typography sx={{ fontFamily: "inherit" }}>
                User: QNOTES
              </Typography>
              <Typography sx={{ fontFamily: "inherit" }}>
                Number: 000368
              </Typography>
              <Typography sx={{ fontFamily: "inherit" }}>
                System: V134212
              </Typography>
            </Box>

            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography sx={{ fontFamily: "inherit", color: cWhite }}>
                Work with Job
              </Typography>
            </Box>

            {/* Main Content Area */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
              }}
            >
              {/* Speaker */}
              {step.speaker && (
                <Typography
                  sx={{ fontFamily: "inherit", color: cCyan, mb: 1, pl: 4 }}
                >
                  {step.speaker}:
                </Typography>
              )}

              {/* Text */}
              <Typography
                sx={{
                  fontFamily: "inherit",
                  color: terminalColor,
                  whiteSpace: "pre-wrap",
                  mb: 2,
                  pl: 4, // Increased padding to prevent clipping
                }}
              >
                {typedText}
                {isTyping && <span className="cursor">_</span>}
              </Typography>

              {/* Choices */}
              {!isTyping && step.choices && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    sx={{ fontFamily: "inherit", color: cBlue, mb: 1 }}
                  >
                    Select one of the following:
                  </Typography>
                  {step.choices.map((choice) => (
                    <Typography
                      key={choice.key}
                      sx={{
                        fontFamily: "inherit",
                        color: terminalColor,
                        ml: 4,
                      }}
                    >
                      {choice.key}. {choice.label}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>

            {/* Command Line */}
            <Box sx={{ mt: "auto", mb: 1 }}>
              <Typography sx={{ fontFamily: "inherit", color: cWhite }}>
                Selection or command
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{ fontFamily: "inherit", color: cWhite, mr: 1 }}
                >
                  ===&gt;
                </Typography>
                <Box
                  sx={{
                    borderBottom: `2px solid ${terminalColor}`,
                    minWidth: "50px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontFamily: "inherit", color: cWhite }}>
                    {inputBuffer}
                  </Typography>
                  {!isTyping && (
                    <Typography
                      sx={{
                        fontFamily: "inherit",
                        color: terminalColor,
                        animation: "blink 1s infinite",
                      }}
                    >
                      _
                    </Typography>
                  )}
                </Box>
                {errorMsg && (
                  <Typography
                    sx={{
                      fontFamily: "inherit",
                      color: "red",
                      ml: 2,
                      bgcolor: "white",
                    }}
                  >
                    {errorMsg}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Function Keys */}
            <Box
              sx={{
                borderTop: `1px solid ${cBlue}`,
                pt: 1,
                display: "flex",
                gap: 3,
                color: cBlue,
              }}
            >
              <Typography
                onClick={() =>
                  window.open(
                    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    "_blank"
                  )
                }
                sx={{
                  fontFamily: "inherit",
                  color: hintGlitch ? "red" : "inherit",
                  fontWeight: hintGlitch ? "bold" : "normal",
                  cursor: "pointer",
                }}
              >
                F3=Exit
              </Typography>
              <Typography
                onClick={() => setShowWin95(true)}
                sx={{
                  fontFamily: "inherit",
                  color: hintGlitch ? "red" : "inherit",
                  fontWeight: hintGlitch ? "bold" : "normal",
                  cursor: "pointer",
                }}
              >
                F4=Prompt
              </Typography>
              <Typography sx={{ fontFamily: "inherit" }}>
                F9=Retrieve
              </Typography>
              <Typography sx={{ fontFamily: "inherit" }}>F12=Cancel</Typography>
            </Box>
          </>
        )}
      </Box>

      {/* Status Bar */}
      <Box
        sx={{
          bgcolor: "#c0c0c0",
          borderTop: "1px solid #808080",
          height: 20,
          display: "flex",
          alignItems: "center",
          px: 1,
          fontSize: "12px",
        }}
      >
        <Box
          sx={{
            bgcolor: cBlue,
            color: cWhite,
            px: 0.5,
            mr: 1,
            fontWeight: "bold",
          }}
        >
          MA
        </Box>
        <Typography variant="caption" sx={{ color: "black", flex: 1 }}>
          a
        </Typography>
        <Typography variant="caption" sx={{ color: "black" }}>
          21/009
        </Typography>
      </Box>

      <style>
        {`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }
          .cursor {
            animation: blink 1s step-end infinite;
            background-color: ${terminalColor};
            color: ${cBlack};
          }
        `}
      </style>
    </Box>
  );
};

export default AS400Terminal;
