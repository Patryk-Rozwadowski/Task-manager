"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskLoggingTemplate = void 0;
const taskLoggingTemplate = (task) => {
    const { id, status, title, description } = task;
    return `
        title: ${title}
        description: ${description}
        id: ${id}
        status: ${status}
    `;
};
exports.taskLoggingTemplate = taskLoggingTemplate;
//# sourceMappingURL=taskLoggingTemplate.js.map