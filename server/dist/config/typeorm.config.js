"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const typeOrmConfig = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "task-manager",
    autoLoadEntities: true,
    synchronize: true,
};
exports.typeOrmConfig = typeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map