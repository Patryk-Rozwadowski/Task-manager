import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	Patch,
	Post,
	Query,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { TasksService } from "./tasks.service";
import CreateTaskDto from "./dto/create-task.dto";
import { taskLoggingTemplate } from "../utils/taskLoggingTemplate";
import GetTasksFilterDto from "./dto/get-tasks-filter.dto";
import TaskStatusValidationPipe from "./pipes/task-status-validation.pipe";
import { ITask } from "./tasks";
import { TasksStatusEnum } from "./enum/tasks-status.enum";

@Controller("tasks")
export class TasksController {
	private logger = new Logger("TasksController");

	constructor(private tasksService: TasksService) {}

	@Get()
	@ApiOperation({ summary: "Get all tasks if not filter is provided" })
	@ApiParam({ name: "getTasks", type: GetTasksFilterDto })
	@ApiResponse({ status: 200, description: "Array of tasks.", isArray: true })
	getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): ITask[] {
		if (Object.keys(filterDto).length) {
			this.logger.log(
				`Getting tasks with filter: ${Object.keys(filterDto)} ${JSON.stringify(
					this.tasksService.getAllTasks(),
					null,
					2,
				)}`,
			);
			return this.tasksService.getTasksWithFilters(filterDto);
		} else {
			this.logger.log(
				`No filters provided - Getting all tasks ${JSON.stringify(this.tasksService.getAllTasks(), null, 2)}`,
			);
			return this.tasksService.getAllTasks();
		}
	}

	@Get("/:id")
	getTaskById(@Param("id") searchedId: string): ITask {
		return this.tasksService.getTaskById(searchedId);
	}

	@Post()
	@ApiOperation({ summary: "Create new task", description: "Creating new task" })
	@ApiQuery({ name: "Task status", enum: TasksStatusEnum })
	@ApiParam({ name: "create task param", type: CreateTaskDto })
	@ApiBody({ type: [CreateTaskDto] })
	@UsePipes(ValidationPipe)
	createTask(@Body() createTaskDto: CreateTaskDto): ITask {
		const createdNewTask = this.tasksService.createTask(createTaskDto);
		this.logger.log(`Created new task: ${taskLoggingTemplate(createdNewTask)}`);
		return createdNewTask;
	}

	@Delete("/:id")
	@ApiOperation({ summary: "Delete task", description: "Delete user's taks with given task's id" })
	deleteTaskById(@Param("id", ValidationPipe) id: string): void {
		this.tasksService.deleteTaskById(id);
		this.logger.log(`Task ${JSON.stringify(id)} deleted.`);
	}

	@Patch("/:id/status")
	editTaskStatus(
		@Param("id") id: string,
		@Body("status", TaskStatusValidationPipe) status: TasksStatusEnum,
	): ITask {
		return this.tasksService.editTaskStatus(id, status);
	}
}
