"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tasks_service_1 = require("./tasks.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const taskLoggingTemplate_1 = require("../utils/taskLoggingTemplate");
const get_tasks_filter_dto_1 = require("./dto/get-tasks-filter.dto");
const task_status_validation_pipe_1 = require("./pipes/task-status-validation.pipe");
const tasks_status_enum_1 = require("./enum/tasks-status.enum");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
        this.logger = new common_1.Logger("TasksController");
    }
    getTasks(filterDto) {
        return this.tasksService.getTasks(filterDto);
    }
    getTaskById(searchedId) {
        return this.tasksService.getTaskById(searchedId);
    }
    createTask(createTaskDto) {
        const createdNewTask = this.tasksService.createTask(createTaskDto);
        this.logger.log(`Created new task: ${taskLoggingTemplate_1.taskLoggingTemplate(createdNewTask)}`);
        return createdNewTask;
    }
    deleteTaskById(id) {
        return this.tasksService.deleteTaskById(id);
    }
    editTaskStatus(id, status) {
        return this.tasksService.editTaskStatus(id, status);
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: "Get all tasks if not filter is provided" }),
    swagger_1.ApiParam({ name: "getTasks", type: get_tasks_filter_dto_1.default }),
    swagger_1.ApiResponse({ status: 200, description: "Array of tasks.", isArray: true }),
    __param(0, common_1.Query(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_tasks_filter_dto_1.default]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTasks", null);
__decorate([
    common_1.Get("/:id"),
    __param(0, common_1.Param("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTaskById", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: "Create new task", description: "Creating new task" }),
    swagger_1.ApiQuery({ name: "Task status", enum: tasks_status_enum_1.TasksStatusEnum }),
    swagger_1.ApiParam({ name: "create task param", type: create_task_dto_1.default }),
    swagger_1.ApiBody({ type: [create_task_dto_1.default] }),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.default]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    common_1.Delete("/:id"),
    swagger_1.ApiOperation({ summary: "Delete task", description: "Delete user's taks with given task's id" }),
    __param(0, common_1.Param("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteTaskById", null);
__decorate([
    common_1.Patch("/:id/status"),
    __param(0, common_1.Param("id", common_1.ParseIntPipe)),
    __param(1, common_1.Body("status", task_status_validation_pipe_1.default)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "editTaskStatus", null);
TasksController = __decorate([
    common_1.Controller("tasks"),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map