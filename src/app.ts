import cors from "cors";
import express from "express";

import { errorHandler } from "./middlewares/error.middleware";
import router from "./routes/health.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(errorHandler);

export default app;
