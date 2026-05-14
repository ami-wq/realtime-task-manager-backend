import { Router } from "express";

import type { Task } from "../types/task";

const router = Router();

const tasks: Task[] = [];

router.get("/tasks", (__, res) => {
  res.json(tasks);
});

router.post("/tasks", (req, res) => {
  const { title } = req.body;

  const newTask: Task = {
    id: Date.now().toString(),
    title,
    completed: false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

export default router;
