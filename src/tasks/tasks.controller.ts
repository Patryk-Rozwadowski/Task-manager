import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";
import { TasksService } from "./tasks.service";
import CreateTaskDto from "./dto/create-task.dto";
import { taskLoggingTemplate } from "../utils/taskLoggingTemplate";
import GetTasksFilterDto from "./dto/get-tasks-filter.dto";
import TaskStatusValidationPipe from "./pipes/task-status-validation.pipe";
import { TasksStatusEnum } from "./enum/tasks-status.enum";
import Task from "./task.entity";

@Controller("tasks")
export class TasksController {
	private logger = new Logger("TasksController");

	constructor(private tasksService: TasksService) {}

	@Get()
	@ApiOperation({ summary: "Get all tasks if not filter is provided" })
	@ApiParam({ name: "getTasks", type: GetTasksFilterDto })
	@ApiResponse({ status: 200, description: "Array of tasks.", isArray: true })
	getTasks(@Body(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
		return this.tasksService.getTasks(filterDto);
	}

	@Get("/:id")
	getTaskById(@Param("id", ParseIntPipe) searchedId: number): Promise<Task> {
		return this.tasksService.getTaskById(searchedId);
	}

	//
	@Post()
	@ApiOperation({ summary: "Create new task", description: "Creating new task" })
	@ApiQuery({ name: "Task status", enum: TasksStatusEnum })
	@ApiParam({ name: "create task param", type: CreateTaskDto })
	@ApiBody({ type: [CreateTaskDto] })
	@UsePipes(ValidationPipe)
	createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
		const createdNewTask = this.tasksService.createTask(createTaskDto);
		this.logger.log(`Created new task: ${taskLoggingTemplate(createdNewTask)}`);
		return createdNewTask;
	}

	//
	@Delete("/:id")
	@ApiOperation({ summary: "Delete task", description: "Delete user's taks with given task's id" })
	deleteTaskById(@Param("id", ParseIntPipe) id: number): Promise<DeleteResult> {
		return this.tasksService.deleteTaskById(id);
	}

	@Patch("/:id/status")
	editTaskStatus(
		@Param("id", ParseIntPipe) id: number,
		@Body("status", TaskStatusValidationPipe) status: TasksStatusEnum,
	): Promise<Task> {
		return this.tasksService.editTaskStatus(id, status);
	}
}
