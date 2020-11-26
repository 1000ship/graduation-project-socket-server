import socket from "socket.io";
import http from "http";
import { getComments, putComment } from "./comments/CommentAPI";

const PORT = 4001;

const server = http.createServer((req, res) => {
  res.write("test");
  res.end();
});

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log(`[${socket.id}] connect on ${PORT}`);

  socket.on("GET_COMMENT", (id) => {
    socket.emit("COMMENT", getComments(id));
  });

  socket.on("PUT_COMMENT", ({ id, commentObject }) => {
    putComment(id, commentObject);
  });
});
