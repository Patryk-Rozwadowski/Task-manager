import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const typeOrmConfig: TypeOrmModuleOptions = {
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "admin",
	database: "task-manager",
	autoLoadEntities: true,
	synchronize: true,
};

export { typeOrmConfig };
