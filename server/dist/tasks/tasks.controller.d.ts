import { DeleteResult } from "typeorm";
import { TasksService } from "./tasks.service";
import CreateTaskDto from "./dto/create-task.dto";
import GetTasksFilterDto from "./dto/get-tasks-filter.dto";
import { TasksStatusEnum } from "./enum/tasks-status.enum";
import Task from "./task.entity";
export declare class TasksController {
    private tasksService;
    private logger;
    constructor(tasksService: TasksService);
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>;
    getTaskById(searchedId: number): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    deleteTaskById(id: number): Promise<DeleteResult>;
    editTaskStatus(id: number, status: TasksStatusEnum): Promise<Task>;
}
