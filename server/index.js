import express from "express";
import cors from "cors";
import { mongoConnect } from "./utils/MogoConnection.js";
import http from "http";
import { Server } from "socket.io";
import PracticeRoutes from "./Routes/Practice.Routes.js";
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use("/demo", PracticeRoutes);
mongoConnect();
const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connecterd", socket.id);
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callended");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data).emit("callAccepted", data.signal);
  });
});

server.listen(300, () => {
  console.log("server is up and running at port 300");
});
