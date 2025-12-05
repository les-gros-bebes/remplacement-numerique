import React from "react";
import { Box, Typography, Paper } from "@mui/material";

interface DialogueBoxProps {
  text: string;
  characterName?: string;
  children?: React.ReactNode;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({
  text,
  characterName = "Mr. Schutz",
  children,
}) => {
  const isRight = characterName === "Mr. Schutz";

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "4px solid",
        borderColor: "primary.main",
        bgcolor: "white",
        position: "relative",
        mt: 2,
        mx: 0,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Character Name Tag */}
      <Box
        sx={{
          position: "absolute",
          top: -20,
          right: isRight ? 24 : "auto",
          left: isRight ? "auto" : 24,
          bgcolor: "secondary.main",
          color: "white",
          px: 2,
          py: 0.5,
          borderRadius: 2,
          fontWeight: "bold",
          boxShadow: 2,
          zIndex: 1,
        }}
      >
        {characterName}
      </Box>

      <Typography
        variant="h6"
        sx={{ mb: 2, minHeight: "3em", lineHeight: 1.6 }}
      >
        {text}
      </Typography>

      {children && (
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
          {children}
        </Box>
      )}
    </Paper>
  );
};

export default DialogueBox;
