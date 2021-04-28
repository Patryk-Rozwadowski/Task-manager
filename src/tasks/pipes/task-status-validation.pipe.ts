import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TasksStatus } from "../task.model";

class TaskStatusValidationPipe implements PipeTransform {
	readonly allowedStatuses = [TasksStatus.OPEN, TasksStatus.IN_PROGRESS, TasksStatus.DONE];
	transform(value: any): any {
		if (!this.isTaskStatusValid(value)) {
			return new BadRequestException(`${value} is invalid task status.`);
		}

		return value;
	}

	private isTaskStatusValid(status: any) {
		const isValid = this.allowedStatuses.indexOf(status);
		return isValid !== -1;
	}
}

export default TaskStatusValidationPipe;
