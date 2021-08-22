import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import AuthCredentialsDto from "./dto/auth-credentials.dto";
import { AuthService } from "./auth.service";
const a = 0;
@Controller("auth")
class AuthController {
	constructor(private authService: AuthService) {}

	@Post("/signup")
	async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
		return this.authService.signUp(authCredentialsDto);
	}

	@Post("/signin")
	async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
		return this.authService.signIn(authCredentialsDto);
	}
}

export default AuthController;
