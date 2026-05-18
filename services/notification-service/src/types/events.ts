export type TaskCreatedEvent = {
  type: "TASK_CREATED";
  payload: {
    taskId: number;
    title: string;
  };
};

export type Event = TaskCreatedEvent;
