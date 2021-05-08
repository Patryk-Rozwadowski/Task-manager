import { EntityRepository, Repository } from "typeorm";
import User from "./user.entity";
import AuthCredentialsDto from "./dto/auth-credentials.dto";
import { Logger } from "@nestjs/common";

@EntityRepository(User)
class UserRepository extends Repository<User> {
	private logger = new Logger("UserRepository");

	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		const { username, password } = authCredentialsDto;

		const newUser = new User();
		newUser.username = username;
		newUser.password = password;

		await newUser.save();

		this.logger.log(`New user created ${username}`);
		return;
	}
}

export default UserRepository;
