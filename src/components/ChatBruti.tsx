import yesVideo from "/yes.mp4";
import noVideo from "/no.mp4";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const YES: string = "Yes.";
const NO: string = "No.";

interface ChatMessage {
  text: string;
  sender: "user" | "bot";
}

export default function ChatBruti() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessages: ChatMessage[] = [
      ...messages,
      { text: input, sender: "user" },
      { text: Math.random() < 0.5 ? YES : NO, sender: "bot" },
    ];
    setMessages(newMessages);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <Box>
      <Paper sx={{ maxHeight: 800, overflowY: "auto" }} ref={scrollRef}>
        <Stack spacing={2}>
          <Box
            sx={{
              padding: 2,
            }}
          />
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                padding: 1,
                display: "flex",
                justifyContent: msg.sender === "user" ? "end" : "start",
              }}
            >
              <Paper elevation={2}>
                <Paper elevation={3} sx={{ padding: 1 }}>
                  <Typography>{msg.text}</Typography>
                  {msg.sender === "bot" ? (
                    <video
                      key={index}
                      src={msg.text == YES ? yesVideo : noVideo}
                      preload="auto"
                      autoPlay
                      controls
                    >
                      Not supported.
                    </video>
                  ) : (
                    <></>
                  )}
                </Paper>
              </Paper>
            </Box>
          ))}
        </Stack>
      </Paper>

      <Box sx={{ display: "flex", marginTop: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Poser une question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <IconButton color="primary" onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
