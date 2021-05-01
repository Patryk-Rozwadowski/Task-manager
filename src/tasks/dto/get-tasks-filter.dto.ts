import { TasksStatus } from "../task.model";
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { allowedTaskStatuses } from "../../utils/allowedTaskStatuses";

class GetTasksFilterDto {
	@IsOptional()
	@IsIn(allowedTaskStatuses)
	status: TasksStatus;

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	@IsInt()
	search: string;
}

export default GetTasksFilterDto;
