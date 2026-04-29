"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taskManager_1 = require("./taskManager");
const task1 = (0, taskManager_1.createTask)("hello");
const task2 = (0, taskManager_1.createTask)("Shahruk");
const updatedTask = (0, taskManager_1.updateTask)(task1, { status: "in-progress" });
console.log(task1);
console.log(updatedTask);
console.log(task2);
