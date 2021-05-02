import { TasksStatusEnum } from "./enum/tasks-status.enum";

interface ITask {
	id: string;
	title: string;
	description: string;
	status: TasksStatusEnum.OPEN;
}

export { ITask };
