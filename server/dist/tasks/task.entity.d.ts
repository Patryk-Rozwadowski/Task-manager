import { BaseEntity } from "typeorm";
import { TasksStatusEnum } from "./enum/tasks-status.enum";
declare class Task extends BaseEntity {
    id: number;
    title: string;
    description: string;
    status: TasksStatusEnum;
}
export default Task;
