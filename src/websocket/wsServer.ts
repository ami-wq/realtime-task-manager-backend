import type http from "node:http";
import { type WebSocket, WebSocketServer } from "ws";

import type { WSMessage } from "../types/ws";

function createWebSocketServer(server: http.Server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket) => {
    console.log("WebSocket connection established");

    ws.on("message", data => {
      let parsed: WSMessage;

      try {
        parsed = JSON.parse(data.toString());
      } catch (_err) {
        console.error("[WS] Invalid JSON");

        ws.send(
          JSON.stringify({
            type: "error",
            payload: "Invalid JSON format",
          }),
        );

        return;
      }

      console.log("[WS] Received:", parsed);
    });
  });

  return wss;
}

export default createWebSocketServer;
