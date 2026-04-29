"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
exports.updateTask = updateTask;
const helpers_1 = require("./helpers");
function createTask(title) {
    return {
        id: (0, helpers_1.generateId)(),
        title: title,
        status: "todo",
        createdAt: (0, helpers_1.formatDate)(new Date()),
    };
}
function updateTask(task, updates) {
    return { ...task, ...updates };
}
