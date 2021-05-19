import { TasksStatusEnum } from "../enum/tasks-status.enum";
declare class GetTasksFilterDto {
    status: TasksStatusEnum;
    search: string;
}
export default GetTasksFilterDto;
