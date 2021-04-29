import { TasksStatus } from "../task.model";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { allowedTaskStatuses } from "../../utils/allowedTaskStatuses";

class GetTasksFilterDto {
	@IsOptional()
	@IsIn(allowedTaskStatuses)
	status: TasksStatus;

	@IsOptional()
	@IsNotEmpty()
	search: string;
}

export default GetTasksFilterDto;
