import * as bcrypt from "bcrypt";
import { EntityRepository, Repository } from "typeorm";
import { ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";
import User from "./user.entity";
import AuthCredentialsDto from "./dto/auth-credentials.dto";

@EntityRepository(User)
class UserRepository extends Repository<User> {
   private logger = new Logger("UserRepository");

   async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
      const { username, password } = authCredentialsDto;

      const newUser = new User();
      newUser.username = username;
      newUser.salt = await bcrypt.genSalt();
      newUser.password = await UserRepository._hashPassword(password, newUser.salt);

      try {
         await newUser.save();
         this.logger.log(`New user created ${username}`);
      } catch ({ code }) {
         const userAlreadyExistsWithUsername = code === "23505";
         if (userAlreadyExistsWithUsername) {
            /*
					In fact, code 23505 stands for already existing user in database,
					but we can't notify other users with such a information, because of safety matters.
				 */
            this.logger.warn(`Username ${username} already exists.`);
            throw new ConflictException(`Username error.`);
         } else throw new InternalServerErrorException();
      }
   }

   async validatePassword(authCredentialsDto: AuthCredentialsDto): Promise<boolean> {
      const { username, password } = authCredentialsDto;
      const user = await this.findOne({ username });

      if (user && (await user.validatePassword(password))) {
         return true;
      }
   }

   private static async _hashPassword(password: string, salt: string): Promise<string> {
      return bcrypt.hash(password, salt);
   }
}

export default UserRepository;
