import WebSocket from "ws";

const clientName = process.argv[2] || "client";

const ws = new WebSocket("ws://localhost:5000");

ws.on("open", () => {
  console.log(`✅ ${clientName} connected`);

  setTimeout(() => {
    ws.send(
      JSON.stringify({
        type: "message",
        payload: `${clientName}: hello`,
      }),
    );
  }, 1000);
});

ws.on("message", data => {
  console.log(`📩 ${clientName} received:`, data.toString());
});

ws.on("close", () => {
  console.log(`❌ ${clientName} disconnected`);
});

ws.on("error", err => {
  console.error(`⚠️ ${clientName} error:`, err);
});
