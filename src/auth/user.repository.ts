import { EntityRepository, Repository } from "typeorm";
import User from "./user.entity";
import AuthCredentialsDto from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";

@EntityRepository(User)
class UserRepository extends Repository<User> {
	private logger = new Logger("UserRepository");

	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		const { username, password } = authCredentialsDto;

		const newUser = new User();
		newUser.username = username;
		newUser.password = password;

		try {
			await newUser.save();
			this.logger.log(`New user created ${username}`);
		} catch ({ code }) {
			const userAlreadyExistsWithUsername = code === " ";
			if (userAlreadyExistsWithUsername) {
				/*
					In fact, code 23505 stands for already existing user in database,
					but we can't notify other users with such a information, because of safety matters.
				 */
				throw new ConflictException(`Username error.`);
			} else throw new InternalServerErrorException();
		}
	}
}

export default UserRepository;
