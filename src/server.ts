import http from "node:http";

import app from "./app";
import { config } from "./config";
import createWebSocketServer from "./websocket/wsServer";

const server = http.createServer(app);

createWebSocketServer(server);

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
