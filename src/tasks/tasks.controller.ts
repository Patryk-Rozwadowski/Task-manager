import { Body, Controller, Get, Logger, Param, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";
import CreateTaskDto from "./dto/create-task.dto";

@Controller("tasks")
export class TasksController {
	private logger = new Logger("TasksController");
	constructor(private tasksService: TasksService) {}

	@Get()
	getAllTasks(): Task[] {
		this.logger.log("Getting all tasks");
		return this.tasksService.getAllTasks();
	}

	@Get("/:id")
	getTaskById(@Param("id") searchedId: string): Task {
		const foundTask = this.tasksService.getTaskById(searchedId);
		if (!foundTask) {
			this.logger.warn("Task doesn't exist!");
			return;
		}
		const { id, description, title, status } = foundTask;
		this.logger.log(`Task found: title: ${title}, id:${id}, status: ${status}, description: ${description}`);
		return foundTask;
	}

	@Post()
	createTask(@Body() createTaskDto: CreateTaskDto): Task {
		const createdNewTask = this.tasksService.createTask(createTaskDto);
		const { id, description, status, title } = createdNewTask;
		this.logger.log(
			`Created new task: ${id}, title: ${title}, description: ${description}, status: ${status}`,
		);
		return createdNewTask;
	}
}
