import { generateId, formatDate } from "./helpers";
import { Task,  PartialTask } from "./types";

function createTask(title: string): Task {
  return {
    id: generateId(),
    title: title,
    status:"todo",
    createdAt: formatDate(new Date()),
  };
} 

function updateTask(task: Task, updates:  PartialTask): Task {
  return { ...task, ...updates };
}

export { createTask, updateTask };