import { Logger } from "@nestjs/common";
import { DeleteResult, Repository } from "typeorm";
import Task from "./task.entity";
import CreateTaskDto from "./dto/create-task.dto";
import { TasksStatusEnum } from "./enum/tasks-status.enum";
import GetTasksFilterDto from "./dto/get-tasks-filter.dto";
declare class TaskRepository extends Repository<Task> {
    logger: Logger;
    getAllTasks(): Promise<Task[]>;
    getTasksWithFilter(filterDto: GetTasksFilterDto): Promise<Task[]>;
    findTaskById(id: number): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    deleteTaskById(id: number): Promise<DeleteResult>;
    editTaskStatus(id: number, status: TasksStatusEnum): Promise<Task>;
}
export default TaskRepository;
