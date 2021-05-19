"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const allowedTaskStatuses_1 = require("../../utils/allowedTaskStatuses");
class TaskStatusValidationPipe {
    transform(value) {
        if (!TaskStatusValidationPipe.isTaskStatusValid(value)) {
            return new common_1.BadRequestException(`${value} is invalid task status.`);
        }
        return value;
    }
    static isTaskStatusValid(status) {
        const isValid = allowedTaskStatuses_1.allowedTaskStatuses.indexOf(status);
        return isValid !== -1;
    }
}
exports.default = TaskStatusValidationPipe;
//# sourceMappingURL=task-status-validation.pipe.js.map