import { DeleteResult, EntityRepository, Repository } from "typeorm";
import Task from "./task.entity";
import CreateTaskDto from "./dto/create-task.dto";
import { TasksStatusEnum } from "./enum/tasks-status.enum";
import { Logger, NotFoundException } from "@nestjs/common";

@EntityRepository(Task)
class TaskRepository extends Repository<Task> {
	logger = new Logger("TaskRespository");

	async getTasks(): Promise<Task[]> {
		const tasks = this.find({});
		return tasks;
	}

	async findTaskById(id: number): Promise<Task> {
		this.logger.log(`Searching for task with id ${id}`);
		const task = this.findOne(id);

		if (!task) {
			throw new NotFoundException(`Task with given id ${id} doesn't exist in database.`);
		}

		return task;
	}

	async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
		const { title, description } = createTaskDto;
		const newTask = new Task();
		newTask.title = title;
		newTask.description = description;
		newTask.status = TasksStatusEnum.OPEN;
		await newTask.save();

		return newTask;
	}

	async deleteTaskById(id: number): Promise<DeleteResult> {
		const taskToDelete = await this.findTaskById(id);
		return this.delete({ id: taskToDelete.id });
	}

	async editTaskStatus(id: number, status: TasksStatusEnum): Promise<Task> {
		let previousStatus: TasksStatusEnum = null;

		const task = await this.findTaskById(id);
		previousStatus = task.status;

		task.status = status;
		await task.save();

		this.logger.log(
			`Task's status with id ${id} has been updated. Previous status: ${previousStatus}, updated status: ${task.status}`,
		);
		return task;
	}
}

export default TaskRepository;
