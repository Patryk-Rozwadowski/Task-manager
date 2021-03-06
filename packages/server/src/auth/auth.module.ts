import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import AuthController from "./auth.controller";
import UserRepository from "./user.repository";

@Module({
	imports: [TypeOrmModule.forFeature([UserRepository])],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
