import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import config from "./config.js";
import "./firebase-admin.js";

// Setting up middleware

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting up MongoDB connection

const mongoURI = config.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Importing routes

import userAuthRoutes from "./routes/user-auth.js";
app.use("/auth", userAuthRoutes);

// Initializing Socket.io

import { Server } from "socket.io";
import http from "http";
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

export { io };
import("./web_socket/socket.js");

//Starting the server

const PORT = config.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
