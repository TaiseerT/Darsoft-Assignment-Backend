import express from "express";
import newsRoutes from "./routes/news.routes.js";
import addressRoutes from "./routes/address.routes.js";
import userRoutes from "./routes/user.routes.js";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { createClient } from "redis";

config();
const server = express();
const httpServer = createServer(server);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// Initialize the Redis Client and connect to the server
const redisClient = createClient();
redisClient.connect().catch(console.error);

// Listen for messages on the 'news' channel from Redis
function handleNewsMessage(channel, message) {
  if (channel === "news") {
    io.emit("newsUpdate", JSON.parse(message));
  }
}


// Register the message listener for the 'news' channel
redisClient.subscribe("news", handleNewsMessage)
  .then(() => {
    console.log('Subscribed to "news" channel');
  })
  .catch((err) => {
    console.error("Failed to subscribe to the 'news' channel: ", err.message || err);
  });


io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
});

server.use(cors());
server.use(express.json());

server.use("/api/users", userRoutes);
server.use("/api/news", newsRoutes);
server.use("/api/address", addressRoutes);

mongoose
  .connect(process.env.DB_URL, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    httpServer.listen(process.env.PORT || 4000, () => {
      console.log(`Server running on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

export default io;