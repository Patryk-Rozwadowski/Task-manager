import CreateTaskDto from "./dto/create-task.dto";
import { TasksStatusEnum } from "./enum/tasks-status.enum";
import TaskRepository from "./task.repository";
import Task from "./task.entity";
import { DeleteResult } from "typeorm";
import GetTasksFilterDto from "./dto/get-tasks-filter.dto";
export declare class TasksService {
    private taskRepository;
    private logger;
    constructor(taskRepository: TaskRepository);
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    getTaskById(id: number): Promise<Task>;
    deleteTaskById(id: number): Promise<DeleteResult>;
    editTaskStatus(id: number, status: TasksStatusEnum): Promise<Task>;
}
