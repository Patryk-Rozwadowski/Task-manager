import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";

config();
const typeOrmConfig: TypeOrmModuleOptions = {
	type: "postgres",
	host: "localhost",
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	autoLoadEntities: true,
	synchronize: true,
};

export { typeOrmConfig };
