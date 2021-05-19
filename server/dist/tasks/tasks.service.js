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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const taskLoggingTemplate_1 = require("../utils/taskLoggingTemplate");
const typeorm_1 = require("@nestjs/typeorm");
const task_repository_1 = require("./task.repository");
let TasksService = class TasksService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
        this.logger = new common_1.Logger("TaskService");
    }
    async getTasks(filterDto) {
        if (Object.keys(filterDto).length >= 1) {
            return await this.taskRepository.getTasksWithFilter(filterDto);
        }
        return this.taskRepository.getAllTasks();
    }
    async createTask(createTaskDto) {
        return this.taskRepository.createTask(createTaskDto);
    }
    async getTaskById(id) {
        const foundTask = await this.taskRepository.findOne(id);
        if (!foundTask) {
            throw new common_1.NotFoundException(`Task with ${id} not found.`);
        }
        this.logger.log(`Task found:${taskLoggingTemplate_1.taskLoggingTemplate(foundTask)}`);
        return foundTask;
    }
    deleteTaskById(id) {
        this.logger.log(`Request to delete task with id ${id}`);
        return this.taskRepository.deleteTaskById(id);
    }
    editTaskStatus(id, status) {
        this.logger.log(`Request to edit task status with id ${id} and with status ${status}`);
        return this.taskRepository.editTaskStatus(id, status);
    }
};
TasksService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(task_repository_1.default)),
    __metadata("design:paramtypes", [task_repository_1.default])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map