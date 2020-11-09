import socket from "socket.io";
import http from 'http';

const PORT = 3000;

const server = http.createServer( (req, res) => {
  res.write("test")
  res.end();
})

const io = socket(server);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

io.on("connection", (socket) => {
  console.log(`[${socket.id}] connect on ${PORT}`);
  
  socket.on("JOIN", ( data ) => {
    console.log( `[${socket.id}] join in ${data}`);
    socket.join(data);
  })

  socket.on("LEAVE", ( data ) => {
    console.log( `[${socket.id}] leave in ${data}`);
    socket.leave(data);
  })

  socket.on("CNT", ( data ) => {
    console.log( `[${socket.id}] count ${data}`);
    socket.leave(data);
  })

  socket.on("EMT", ( data ) => {
    console.log( `[${socket.id}] emotioned ${data}`);
    socket.leave(data);
  })

  socket.on("MSG", ( data ) => {
    console.log( `[${socket.id}] messaged ${data}`);
    socket.leave(data);
  })

  var instanceId = socket.id;
  socket.on("msg", function (data) {
    console.log(data);
    socket.emit("recMsg", { comment: instanceId + ":" + data.comment + "\n" });
  });
});
