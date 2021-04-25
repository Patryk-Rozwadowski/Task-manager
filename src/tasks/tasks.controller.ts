import { Body, Controller, Delete, Get, Logger, Param, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";
import CreateTaskDto from "./dto/create-task.dto";
import { taskLoggingTemplate } from "../utils/taskLoggingTemplate";

@Controller("tasks")
export class TasksController {
	private logger = new Logger("TasksController");

	constructor(private tasksService: TasksService) {}

	@Get()
	getAllTasks(): Task[] {
		this.logger.log(`Getting all tasks ${JSON.stringify(this.tasksService.getAllTasks(), null, 2)}`);
		return this.tasksService.getAllTasks();
	}

	@Get("/:id")
	getTaskById(@Param("id") searchedId: string): Task {
		const foundTask = this.tasksService.getTaskById(searchedId);
		if (!foundTask) {
			this.logger.warn("Task doesn't exist!");
			return;
		}
		this.logger.log(`
		Task found: 
			${taskLoggingTemplate(foundTask)}
		`);
		return foundTask;
	}

	@Post()
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
}
