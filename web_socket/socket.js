import { io } from "../index.js";
import jwt from "jsonwebtoken";
import config from "../config.js";

io.use((socket, next) => {
  // Middleware to check for authentication or other conditions
  try {
    const auth = socket.handshake.auth;
    if (auth.authorization) {
      const verified = jwt.verify(auth.authorization, config.JWT_SECRET);
      if (!verified) {
        throw new Error("Authentication error");
      }
      next();
    } else {
      throw new Error("Authentication error");
    }
  } catch (err) {
    console.log("Error :", err);
    next(err);
  }
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("message", (message) => {
    console.log("Received message:", message);
    // Broadcast the message to all connected clients
    io.emit("message", message);
  });
});

io.on("error", (error) => {
  console.error("Socket error:", error);
});
