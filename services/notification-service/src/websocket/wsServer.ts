import type http from "node:http";
import { WebSocket, WebSocketServer } from "ws";

import type { WSMessage } from "../types/ws";

function createWebSocketServer(server: http.Server) {
  const wss = new WebSocketServer({ server });
  const clients = new Set<WebSocket>();

  wss.on("connection", (ws: WebSocket) => {
    console.log("WebSocket connection established");

    clients.add(ws);

    function broadcast(data: string) {
      clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    }

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
          broadcast(
            JSON.stringify({
              type: "message",
              payload: parsed.payload,
            }),
          );
          console.log(`[WS] Broadcasting to ${clients.size} clients`);
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
  });

  return wss;
}

export default createWebSocketServer;
