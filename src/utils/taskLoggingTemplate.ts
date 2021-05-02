import { ITask } from "../tasks/tasks";

const taskLoggingTemplate = (task: ITask): string => {
	const { id, status, title, description } = task;
	return `
        title: ${title}
        description: ${description}
        id: ${id}
        status: ${status}
    `;
};

export { taskLoggingTemplate };
