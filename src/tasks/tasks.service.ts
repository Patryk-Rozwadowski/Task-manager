import { Injectable, Logger } from "@nestjs/common";
import { Task, TasksStatus } from "./task.model";
import { v4 as uuidv4 } from "uuid";
import CreateTaskDto from "./dto/create-task.dto";
import GetTasksFilterDto from "./dto/get-tasks-filter.dto";

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
		return this.tasks.find((task: Task) => task.id === id);
	}

	deleteTaskById(id: string) {
		this.tasks = this.tasks.filter((task) => task.id !== id);
	}

	editTaskStatus(id: string, status: TasksStatus) {
		const taskToEdit = this.getTaskById(id);
		if (!taskToEdit) {
			this.logger.warn(`Task with id ${id} not found`);
			return;
		}

		this.logger.log(`Task title: ${taskToEdit.title} changed status from: ${taskToEdit.status} to ${status}`);
		taskToEdit.status = status;
		return taskToEdit;
	}
}
