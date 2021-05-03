import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import CreateTaskDto from "./dto/create-task.dto";
import { taskLoggingTemplate } from "../utils/taskLoggingTemplate";
import { TasksStatusEnum } from "./enum/tasks-status.enum";
import { InjectRepository } from "@nestjs/typeorm";
import TaskRepository from "./task.repository";
import Task from "./task.entity";
import { DeleteResult } from "typeorm";
import GetTasksFilterDto from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
	private logger = new Logger("TaskService");
	constructor(
		@InjectRepository(TaskRepository)
		private taskRepository: TaskRepository,
	) {}
	// private tasks: Array<ITask> = [];
	//
	// getAllTasks(): ITask[] {
	// 	return this.tasks;
	// }
	//
	// getTasksWithFilters(filterDto: GetTasksFilterDto): ITask[] {
	// 	const { status, search } = filterDto;
	// 	this.logger.log(`Getting tasks with filter: ${Object.keys(filterDto)}`);
	// 	let tasks = this.getAllTasks();
	//
	// 	if (status) tasks = tasks.filter((task) => task);
	//
	// 	if (search)
	// 		tasks = tasks.filter((task) => {
	// 			return task.title.includes(search) || task.description.includes(search);
	// 		});
	//
	// 	return tasks;
	// }
	//

	async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
		return this.taskRepository.getTasks();
	}

	async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
		return this.taskRepository.createTask(createTaskDto);
	}

	async getTaskById(id: number): Promise<Task> {
		const foundTask = await this.taskRepository.findOne(id);
		if (!foundTask) {
			throw new NotFoundException(`Task with ${id} not found.`);
		}
		this.logger.log(`Task found:${taskLoggingTemplate(foundTask)}`);
		return foundTask;
	}

	deleteTaskById(id: number): Promise<DeleteResult> {
		this.logger.log(`Request to delete task with id ${id}`);
		return this.taskRepository.deleteTaskById(id);
	}

	editTaskStatus(id: number, status: TasksStatusEnum): Promise<Task> {
		this.logger.log(`Request to edit task status with id ${id} and with status ${status}`);
		return this.taskRepository.editTaskStatus(id, status);
	}
}
