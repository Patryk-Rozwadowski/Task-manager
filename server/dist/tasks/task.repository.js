"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const task_entity_1 = require("./task.entity");
const tasks_status_enum_1 = require("./enum/tasks-status.enum");
let TaskRepository = class TaskRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger("TaskRespository");
    }
    async getAllTasks() {
        return this.find({});
    }
    async getTasksWithFilter(filterDto) {
        const { status, search } = filterDto;
        this.logger.log(`Getting tasks with filter: ${Object.keys(filterDto)} - ${Object.values(filterDto)}`);
        const query = this.createQueryBuilder("task");
        if (status)
            query.andWhere("task.status = :status", { status });
        if (search)
            query.andWhere("(task.title LIKE :search OR task.description LIKE :search)", { search: `%${search}%` });
        return await query.getMany();
    }
    async findTaskById(id) {
        this.logger.log(`Searching for task with id ${id}`);
        const task = this.findOne(id);
        if (!task) {
            throw new common_1.NotFoundException(`Task with given id ${id} doesn't exist in database.`);
        }
        return task;
    }
    async createTask(createTaskDto) {
        const { title, description } = createTaskDto;
        const newTask = new task_entity_1.default();
        newTask.title = title;
        newTask.description = description;
        newTask.status = tasks_status_enum_1.TasksStatusEnum.OPEN;
        await newTask.save();
        return newTask;
    }
    async deleteTaskById(id) {
        const taskToDelete = await this.findTaskById(id);
        return this.delete({ id: taskToDelete.id });
    }
    async editTaskStatus(id, status) {
        let previousStatus = null;
        const task = await this.findTaskById(id);
        previousStatus = task.status;
        task.status = status;
        await task.save();
        this.logger.log(`Task's status with id ${id} has been updated. Previous status: ${previousStatus}, updated status: ${task.status}`);
        return task;
    }
};
TaskRepository = __decorate([
    typeorm_1.EntityRepository(task_entity_1.default)
], TaskRepository);
exports.default = TaskRepository;
//# sourceMappingURL=task.repository.js.map