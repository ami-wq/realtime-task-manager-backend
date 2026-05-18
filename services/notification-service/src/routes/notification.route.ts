import { Router } from "express";

import { notifications } from "../store/notifications.store";

const router = Router();

router.get("/notifications", (_, res) => {
  res.json(notifications);
});

export default router;
