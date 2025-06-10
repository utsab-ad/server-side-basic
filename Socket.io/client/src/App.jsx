import React, { useEffect, useState, useMemo } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { io } from "socket.io-client";

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const socket =  io("http://localhost:3030");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    socket.emit("message", message);
    setMessages((prevMessages) => [...prevMessages, { text: message, self: true }]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("receive-message", (data) => {
      setMessages((prevMessages) => [...prevMessages, { text: data, self: false }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        🗨️ Real-Time Chat
      </Typography>

      <Paper sx={{ height: "400px", overflowY: "auto", p: 2, mb: 2, bgcolor: "#f5f5f5" }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                justifyContent: msg.self ? "flex-end" : "flex-start",
              }}
            >
              <ListItemText
                primary={msg.text}
                sx={{
                  bgcolor: msg.self ? "#1976d2" : "#e0e0e0",
                  color: msg.self ? "#fff" : "#000",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: "75%",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box component="form" onSubmit={handleSubmit} display="flex" gap={1}>
        <TextField
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          label="Type a message"
          variant="outlined"
        />
        <Button variant="contained" type="submit">
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default App;
