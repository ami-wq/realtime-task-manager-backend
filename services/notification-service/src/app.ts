import cors from "cors";
import express from "express";

import { errorHandler } from "./middlewares/error.middleware";
import eventsRouter from "./routes/events.route";
import healthRouter from "./routes/health.route";
import notificationRouter from "./routes/notification.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use(healthRouter);
app.use(notificationRouter);
app.use(eventsRouter);

app.use(errorHandler);

export default app;
