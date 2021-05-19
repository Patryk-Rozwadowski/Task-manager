import { BaseEntity } from "typeorm";
declare class User extends BaseEntity {
    id: number;
    username: string;
    password: string;
    salt: string;
    validatePassword(inputPassword: string): Promise<boolean>;
}
export default User;
