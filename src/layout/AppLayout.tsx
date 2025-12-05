import { Box, Button, Paper } from "@mui/material";
import { Outlet } from "react-router";
import ChatBruti from "../components/ChatBruti";
import { useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";

export default function AppLayout() {
  const [chatOn, setChatOn] = useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Outlet />

      <Box
        sx={{
          position: "absolute",
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          zIndex: 1,
        }}
      >
        <Box>
          {chatOn && (
            <Paper elevation={0} sx={{ margin: 1, padding: 1 }}>
              <ChatBruti />
            </Paper>
          )}
        </Box>
        <Button
          sx={{
            borderRadius: "50%",
            width: "fit-content",
            aspectRatio: "1",
            backgroundColor: "black",
            opacity: 0.7,
            mb: 1,
            mr: 1,
          }}
          onClick={() => setChatOn(!chatOn)}
        >
          <ChatIcon />
        </Button>
      </Box>
    </Box>
  );
}
