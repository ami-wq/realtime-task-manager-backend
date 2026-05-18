import { Router } from "express";

import type { Event } from "../types/events";
import type { Notification } from "../types/notification";

const router = Router();

const notifications: Notification[] = [];

router.post("/events", (req, res) => {
  const event: Event = req.body;

  console.log("[EVENT RECEIVED]", event);

  switch (event.type) {
    case "TASK_CREATED":
      notifications.push({
        id: Date.now(),
        message: `New task created: ${event.payload.title}`,
        createdAt: new Date().toISOString(),
      });
      break;

    default:
      console.warn("[EVENT RECEIVED] Unknown event type:", event.type);
  }

  res.status(200).json({ status: "ok" });
});

export default router;
