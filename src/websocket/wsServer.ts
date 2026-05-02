import type http from "node:http";
import { type WebSocket, WebSocketServer } from "ws";

import type { WSMessage } from "../types/ws";

function createWebSocketServer(server: http.Server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket) => {
    console.log("WebSocket connection established");

    ws.on("message", data => {
      let parsed: WSMessage;

      ws.send(
        JSON.stringify({
          type: "welcome",
          payload: "Connected to server",
        }),
      );

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

      switch (parsed.type) {
        case "ping":
          console.log("[WS] Ping received");
          break;

        case "message":
          console.log("[WS] Message received:", parsed.payload);
          break;

        default:
          console.warn("[WS] Unknown event type:", parsed.type);

          ws.send(
            JSON.stringify({
              type: "error",
              payload: "Unknown event type",
            }),
          );
      }
    });

    ws.on("close", () => {
      console.log("[WS] Client disconnected");
    });
  });

  return wss;
}

export default createWebSocketServer;
