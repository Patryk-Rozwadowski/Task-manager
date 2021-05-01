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
import { TasksService } from "./tasks.service";
import { Task, TasksStatus } from "./task.model";
import CreateTaskDto from "./dto/create-task.dto";
import { taskLoggingTemplate } from "../utils/taskLoggingTemplate";
import GetTasksFilterDto from "./dto/get-tasks-filter.dto";
import TaskStatusValidationPipe from "./pipes/task-status-validation.pipe";
import { ApiOperation, ApiProperty, ApiResponse } from "@nestjs/swagger";

type ITask = {
	id: string;
	title: string;
	description: string;
	status: TasksStatus;
};
@Controller("tasks")
export class TasksController {
	private logger = new Logger("TasksController");

	constructor(private tasksService: TasksService) {}

	@Get()
	@ApiOperation({ summary: "Get all tasks if not filter is provided" })
	@ApiResponse({ status: 200, description: "Array of tasks.", type: ITask })
	getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
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
	getTaskById(@Param("id") searchedId: string): Task {
		return this.tasksService.getTaskById(searchedId);
	}

	@Post()
	@UsePipes(ValidationPipe)
	createTask(@Body() createTaskDto: CreateTaskDto): Task {
		const createdNewTask = this.tasksService.createTask(createTaskDto);
		this.logger.log(`Created new task: ${taskLoggingTemplate(createdNewTask)}`);
		return createdNewTask;
	}

	@Delete("/:id")
	deleteTaskById(@Param("id") id: string): void {
		const requestingTaskToDelete = this.tasksService.getTaskById(id);

		if (!requestingTaskToDelete) {
			this.logger.log(`Task with id ${id} doesnt exist!`);
			return;
		}

		if (typeof id !== "string") {
			this.logger.warn("Given id is not string");
			return;
		}

		this.tasksService.deleteTaskById(id);
		this.logger.log(`Task ${JSON.stringify(requestingTaskToDelete)} deleted.`);
	}

	@Patch("/:id/status")
	editTaskStatus(
		@Param("id") id: string,
		@Body("status", TaskStatusValidationPipe) status: TasksStatus,
	): Task {
		return this.tasksService.editTaskStatus(id, status);
	}
}
