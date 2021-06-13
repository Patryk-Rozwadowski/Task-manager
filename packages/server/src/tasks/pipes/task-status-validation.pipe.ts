import { BadRequestException, PipeTransform } from "@nestjs/common";
import { allowedTaskStatuses } from "../../utils/allowedTaskStatuses";

class TaskStatusValidationPipe implements PipeTransform {
   transform(value: any): any {
      if (!TaskStatusValidationPipe.isTaskStatusValid(value)) {
         return new BadRequestException(`${value} is invalid task status.`);
      }

      return value;
   }

   public static isTaskStatusValid(status: any) {
      const isValid = allowedTaskStatuses.indexOf(status);
      return isValid !== -1;
   }
}

export default TaskStatusValidationPipe;
