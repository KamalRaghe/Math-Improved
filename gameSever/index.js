const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
let score = 0;
app.use(cors());

app.use(cors({
  origin: "*",
}));

app.get('/score',(req, res)=>{
  score += 1
  res.send({count: score})
  console.log(res)
})


app.listen(8080, () => {
  console.log("SERVER IS RUNNING");
});



// WebSocket
// const { Server } = require("socket.io");
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "https://mathimproved.com/Game",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });
// });

// server.listen(3001, () => {
//   console.log("SERVER IS RUNNING");
// });