import { Router } from "express";

import type { Task } from "../types/task";

const router = Router();

const tasks: Task[] = [];

router.get("/tasks", (__, res) => {
  res.json(tasks);
});

router.post("/tasks", async (req, res) => {
  const { title } = req.body;

  const newTask: Task = {
    id: Date.now().toString(),
    title,
    completed: false,
  };

  tasks.push(newTask);

  try {
    await fetch("http://localhost:5001/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "TASK_CREATED",
        payload: {
          taskId: newTask.id,
          title: newTask.title,
        },
      }),
    });

    console.log("[EVENT SENT] TASK_CREATED");
  } catch (error) {
    console.error("[EVENT ERROR]", error);
  }

  res.status(201).json(newTask);
});

export default router;
