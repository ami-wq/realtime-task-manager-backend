import type http from "node:http";
import { WebSocket, WebSocketServer } from "ws";

import type { WSMessage } from "../types/ws";

const clients = new Set<WebSocket>();

function broadcast(message: unknown) {
  const data = JSON.stringify(message);

  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });

  console.log(`[WS] Broadcasted to ${clients.size} clients`);
}

function createWebSocketServer(server: http.Server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket) => {
    console.log("WebSocket connection established");

    clients.add(ws);

    ws.send(
      JSON.stringify({
        type: "welcome",
        payload: "Connected to notification service",
      }),
    );

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
          ws.send(
            JSON.stringify({
              type: "pong",
            }),
          );
          break;

        case "message":
          broadcast({
            type: "message",
            payload: parsed.payload,
          });
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
      clients.delete(ws);
    });

    ws.on("error", error => {
      console.error("[WS] Error:", error);
    });
  });

  return wss;
}

export default createWebSocketServer;
export { broadcast };