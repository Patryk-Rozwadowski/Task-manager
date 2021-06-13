import { IsIn, IsOptional, IsString } from "class-validator";
import { allowedTaskStatuses } from "../../utils/allowedTaskStatuses";
import { TasksStatusEnum } from "../enum/tasks-status.enum";

class GetTasksFilterDto {
   @IsOptional()
   @IsIn(allowedTaskStatuses)
   status: TasksStatusEnum;

   @IsOptional()
   @IsString()
   search: string;
}

export default GetTasksFilterDto;
