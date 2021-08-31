import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { config } from "dotenv";

config();

async function bootstrap(): Promise<void> {
	const port = process.env.SERVER_PORT || 3001;
	const logger = new Logger("bootstrap");
	const app = await NestFactory.create(AppModule);
	app.enableCors();

	const apiDocumentBuilder = new DocumentBuilder()
		.setTitle("Task manager")
		.setDescription("Task manager API documentation.")
		.setVersion("0.1")
		.build();

	const apiDocumentation = SwaggerModule.createDocument(app, apiDocumentBuilder);
	SwaggerModule.setup("api", app, apiDocumentation);

	await app.listen(port);

	logger.log(`Application listening on port ${port}`);
}

bootstrap();
