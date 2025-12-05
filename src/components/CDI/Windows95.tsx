import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import DoomPlayer from "./DoomPlayer";

const DesktopIcon: React.FC<{
  label: string;
  icon: string;
  onClick?: (e?: React.MouseEvent) => void;
}> = ({ label, icon, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: 80,
      mb: 2,
      cursor: "pointer",
      "&:active": { opacity: 0.7 },
    }}
  >
    {/* Icon Image */}
    <Box
      component="img"
      src={icon}
      alt={label}
      sx={{
        width: 32,
        height: 32,
        mb: 0.5,
        imageRendering: "pixelated",
      }}
    />
    <Typography
      variant="caption"
      sx={{
        color: "white",
        textShadow: "1px 1px 1px black",
        textAlign: "center",
        lineHeight: 1.1,
        bgcolor: "transparent", // Selected state would be blue
      }}
    >
      {label}
    </Typography>
  </Box>
);

const Windows95: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [startOpen, setStartOpen] = useState(false);
  const [showDoom, setShowDoom] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "#008080", // Classic Teal
        display: "flex",
        flexDirection: "column",
        zIndex: 200,
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
      onClick={() => setStartOpen(false)}
    >
      {/* Desktop Area */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <DesktopIcon
          label="My Computer"
          icon="https://win98icons.alexmeub.com/icons/png/computer_explorer-0.png"
        />
        <DesktopIcon
          label="Recycle Bin"
          icon="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-0.png"
        />
        <DesktopIcon
          label="Doom.exe"
          icon="https://win98icons.alexmeub.com/icons/png/ms_dos-1.png"
          onClick={(e) => {
            e?.stopPropagation();
            setShowDoom(true);
          }}
        />
      </Box>

      {/* Doom Window */}
      {showDoom && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "646px", // 640 + 2*3 border
            height: "auto", // Let content define height
            bgcolor: "#c0c0c0",
            border: "3px solid #c0c0c0",
            borderTop: "3px solid #fff",
            borderLeft: "3px solid #fff",
            borderRight: "3px solid #808080",
            borderBottom: "3px solid #808080",
            boxShadow: "4px 4px 10px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            zIndex: 300,
          }}
        >
          {/* Title Bar */}
          <Box
            sx={{
              background: "linear-gradient(to right, #000080, #1084d0)",
              color: "white",
              p: 0.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                MS-DOS Prompt - DOOM
              </Typography>
            </Box>
            <Box
              onClick={() => setShowDoom(false)}
              sx={{
                width: 16,
                height: 16,
                bgcolor: "#c0c0c0",
                border: "1px solid #fff",
                boxShadow: "outset 1px 1px black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                color: "black",
                cursor: "pointer",
              }}
            >
              X
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, bgcolor: "black", position: "relative" }}>
            <DoomPlayer onClose={() => setShowDoom(false)} />
          </Box>
        </Box>
      )}

      {/* Start Menu */}
      {startOpen && (
        <Box
          sx={{
            position: "absolute",
            bottom: 32, // Height of taskbar + border
            left: 2,
            width: 150,
            bgcolor: "#c0c0c0",
            border: "2px solid",
            borderColor: "#fff #808080 #808080 #fff", // Bevel
            boxShadow: "2px 2px 5px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            zIndex: 201,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Box
            sx={{
              bgcolor: "#000080",
              color: "white",
              p: 0.5,
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              height: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              width: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Windows 95
          </Box>
          <Box sx={{ pl: 4, py: 0.5 }}>
            <Box
              sx={{
                p: 1,
                cursor: "pointer",
                "&:hover": { bgcolor: "#000080", color: "white" },
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              📁 Programs
            </Box>
            <Box
              sx={{
                p: 1,
                cursor: "pointer",
                "&:hover": { bgcolor: "#000080", color: "white" },
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              📄 Documents
            </Box>
            <Box sx={{ height: 1, bgcolor: "gray", my: 0.5, mx: 1 }} />
            <Box
              onClick={onClose}
              sx={{
                p: 1,
                cursor: "pointer",
                "&:hover": { bgcolor: "#000080", color: "white" },
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              🔌 Shut Down...
            </Box>
          </Box>
        </Box>
      )}

      {/* Taskbar */}
      <Box
        sx={{
          height: 28,
          bgcolor: "#c0c0c0",
          borderTop: "2px solid #fff",
          display: "flex",
          alignItems: "center",
          px: 0.5,
          justifyContent: "space-between",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          onClick={() => setStartOpen(!startOpen)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            px: 1,
            py: 0.5,
            bgcolor: "#c0c0c0",
            border: startOpen
              ? "2px solid #808080 #fff #fff #808080" // Pressed
              : "2px solid #fff #808080 #808080 #fff", // Raised
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "12px",
            height: 20,
          }}
        >
          <img
            src="https://win98icons.alexmeub.com/icons/png/windows-0.png"
            alt="win"
            style={{ height: 16, width: 16, marginRight: 4 }}
          />
          Start
        </Box>

        <Box
          sx={{
            border: "2px solid #808080 #fff #fff #808080", // Sunken
            px: 1,
            py: 0.5,
            fontSize: "12px",
            bgcolor: "#c0c0c0",
            display: "flex",
            alignItems: "center",
            height: 20,
          }}
        >
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Box>
      </Box>
    </Box>
  );
};

export default Windows95;
