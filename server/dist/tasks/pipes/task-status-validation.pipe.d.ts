import { PipeTransform } from "@nestjs/common";
declare class TaskStatusValidationPipe implements PipeTransform {
    transform(value: any): any;
    static isTaskStatusValid(status: any): boolean;
}
export default TaskStatusValidationPipe;
