import { Body, Controller, Post } from "@nestjs/common";
import AuthCredentialsDto from "./dto/auth-credentials.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
class AuthController {
	constructor(private authService: AuthService) {}

	@Post("/signup")
	async signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
		return this.authService.signUp(authCredentialsDto);
	}
}

export default AuthController;
