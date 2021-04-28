import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Task, TasksStatus } from "./task.model";
import { v4 as uuidv4 } from "uuid";
import CreateTaskDto from "./dto/create-task.dto";
import GetTasksFilterDto from "./dto/get-tasks-filter.dto";
import { taskLoggingTemplate } from "../utils/taskLoggingTemplate";

@Injectable()
export class TasksService {
	private logger = new Logger("TaskService");
	private tasks: Array<Task> = [];

	getAllTasks(): Task[] {
		return this.tasks;
	}

	getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
		const { status, search } = filterDto;

		let tasks = this.getAllTasks();

		if (status) {
			tasks = tasks.filter((task) => task);
		}

		if (search) {
			tasks = tasks.filter((task) => {
				return task.title.includes(search) || task.description.includes(search);
			});
		}

		return tasks;
	}

	createTask(createTaskDto: CreateTaskDto): Task {
		const { title, description } = createTaskDto;

		const task: Task = {
			id: uuidv4(),
			title,
			description,
			status: TasksStatus.OPEN,
		};

		this.tasks.push(task);
		return task;
	}

	getTaskById(id: string): Task {
		const foundTask = this.tasks.find((task: Task) => task.id === id);
		if (!foundTask) {
			throw new NotFoundException(`Task with ${id} not found.`);
		}
		this.logger.log(`
		Task found: 
			${taskLoggingTemplate(foundTask)}
		`);
		return foundTask;
	}

	deleteTaskById(id: string) {
		const taskToDelete = this.getTaskById(id);
		this.tasks = this.tasks.filter((task) => task.id !== taskToDelete.id);
	}

	editTaskStatus(id: string, status: TasksStatus) {
		const taskToEdit = this.getTaskById(id);
		taskToEdit.status = status;
		return taskToEdit;
	}
}
