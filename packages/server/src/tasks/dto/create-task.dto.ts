import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { TasksStatusEnum } from "../enum/tasks-status.enum";

class CreateTaskDto {
   @IsNotEmpty()
   @IsString()
   @ApiProperty({
      description: "Task status",
      example: "Cool task!",
      default: null,
   })
   title: string;

   @IsNotEmpty()
   @ApiProperty({
      description: "Description for task.",
      example: "This is coolest task ever!",
      default: null,
   })
   description: string;

   @ApiProperty({
      description: "task_status",
      default: TasksStatusEnum.OPEN,
   })
   status: TasksStatusEnum.OPEN;
}

export default CreateTaskDto;
