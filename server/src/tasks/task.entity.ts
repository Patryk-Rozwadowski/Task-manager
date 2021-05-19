import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TasksStatusEnum } from "./enum/tasks-status.enum";

@Entity()
class Task extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	status: TasksStatusEnum;
}

export default Task;
