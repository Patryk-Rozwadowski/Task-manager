import { TasksStatus } from "../task.model";

class GetTasksFilterDto {
	status: TasksStatus;
	search: string;
}

export default GetTasksFilterDto;
