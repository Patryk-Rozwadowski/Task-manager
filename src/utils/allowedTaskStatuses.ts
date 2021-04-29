import { TasksStatus } from "../tasks/task.model";

const allowedTaskStatuses = [TasksStatus.OPEN, TasksStatus.IN_PROGRESS, TasksStatus.DONE];

export { allowedTaskStatuses };
