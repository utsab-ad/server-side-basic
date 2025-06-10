import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const PORT = 3030;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("Hello ji");
});

io.on("connection", (socket) => {
  console.log("User Connected ID:", socket.id);

  socket.on("message", (data) => {
    console.log(data);
    io.emit("receive-message", data);
  });

//   socket.on("disconnect", () => {
//     console.log(`User Disconnected`);
//   });
});

server.listen(PORT, () => {
  console.log(`Server is runnin at PORT:${PORT}`);
});
