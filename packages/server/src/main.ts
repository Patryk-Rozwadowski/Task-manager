import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap(): Promise<void> {
	const port = process.env.SERVER_PORT || 3000;
	const logger = new Logger("bootstrap");
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle("Task manager")
		.setDescription("Task manager API documentation.")
		.setVersion("0.1")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	await app.listen(port);

	logger.log(`Application listening on port ${port}`);
}

bootstrap();
