import { TasksStatusEnum } from "../enum/tasks-status.enum";
declare class CreateTaskDto {
    title: string;
    description: string;
    status: TasksStatusEnum.OPEN;
}
export default CreateTaskDto;
