import cors from "cors";
import express from "express";

import { errorHandler } from "./middlewares/error.middleware";
import healthRouter from "./routes/health.route";
import taskRouter from "./routes/task.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use(healthRouter);
app.use(taskRouter);

app.use(errorHandler);

export default app;
