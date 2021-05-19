import { Repository } from "typeorm";
import User from "./user.entity";
import AuthCredentialsDto from "./dto/auth-credentials.dto";
declare class UserRepository extends Repository<User> {
    private logger;
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    validatePassword(authCredentialsDto: AuthCredentialsDto): Promise<boolean>;
    private static _hashPassword;
}
export default UserRepository;
