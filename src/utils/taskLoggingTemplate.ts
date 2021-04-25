import { Task } from "../tasks/task.model";

const taskLoggingTemplate = (task: Task): string => {
	const { id, status, title, description } = task;
	return `
        title: ${title}
        description: ${description}
        id: ${id}
        status: ${status}
    `;
};

export { taskLoggingTemplate };
