import { Injectable } from "@nestjs/common";
import { Task, TasksStatus } from "./task.model";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class TasksService {
	private tasks: Array<Task> = [];

	getAllTasks(): Task[] {
		return this.tasks;
	}

	createTask(title: string, description: string): Task {
		const task: Task = {
			id: uuidv4(),
			title,
			description,
			status: TasksStatus.OPEN,
		};

		this.tasks.push(task);
		return task;
	}
}
