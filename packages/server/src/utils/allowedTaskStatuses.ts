import { TasksStatusEnum } from "../tasks/enum/tasks-status.enum";

const allowedTaskStatuses = [
	TasksStatusEnum.OPEN,
	TasksStatusEnum.IN_PROGRESS,
	TasksStatusEnum.DONE,
];

export { allowedTaskStatuses };
