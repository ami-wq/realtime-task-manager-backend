import { Router } from "express";

const router = Router();

const notifications: Notification[] = [];

router.get("/notifications", (_, res) => {
  res.json(notifications);
});

export default router;
