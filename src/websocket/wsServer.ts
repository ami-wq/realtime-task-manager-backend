import type http from "node:http";
import { WebSocketServer } from "ws";

function createWebSocketServer(server: http.Server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", () => {
    console.log("WebSocket connection established");
  });

  return wss;
}

export default createWebSocketServer;
