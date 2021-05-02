import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import CreateTaskDto from "./dto/create-task.dto";
import GetTasksFilterDto from "./dto/get-tasks-filter.dto";
import { taskLoggingTemplate } from "../utils/taskLoggingTemplate";
import { ITask } from "./tasks";
import { TasksStatusEnum } from "./enum/tasks-status.enum";

@Injectable()
export class TasksService {
	private logger = new Logger("TaskService");
	private tasks: Array<ITask> = [];

	getAllTasks(): ITask[] {
		return this.tasks;
	}

	getTasksWithFilters(filterDto: GetTasksFilterDto): ITask[] {
		const { status, search } = filterDto;
		this.logger.log(`Getting tasks with filter: ${Object.keys(filterDto)}`);
		let tasks = this.getAllTasks();

		if (status) tasks = tasks.filter((task) => task);

		if (search)
			tasks = tasks.filter((task) => {
				return task.title.includes(search) || task.description.includes(search);
			});

		return tasks;
	}

	createTask(createTaskDto: CreateTaskDto): ITask {
		const { title, description } = createTaskDto;

		const task: ITask = {
			id: uuidv4(),
			title,
			description,
			status: TasksStatusEnum.OPEN,
		};

		this.tasks.push(task);
		return task;
	}

	getTaskById(id: string): ITask {
		const foundTask = this.tasks.find((task: ITask) => task.id === id);
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

	editTaskStatus(id: string, status: TasksStatusEnum) {
		const taskToEdit = this.getTaskById(id);
		taskToEdit.status = <TasksStatusEnum.OPEN>status;
		return taskToEdit;
	}
}
