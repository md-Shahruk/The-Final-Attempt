import { createTask, updateTask } from "./taskManager";

const task1 = createTask("hello");
const task2 = createTask("Shahruk");

const updatedTask = updateTask(task1, { status: "in-progress" });

console.log(task1);
console.log(updatedTask);
console.log(task2);