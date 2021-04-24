import { Injectable } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
	private tasks: Array<Task> = [];

	getAllTasks(): Task[] {
		return this.tasks;
	}
}
