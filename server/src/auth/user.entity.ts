import * as bcrypt from "bcrypt";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
@Entity()
@Unique(["username"])
class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	password: string;

	@Column()
	salt: string;

	public async validatePassword(inputPassword: string): Promise<boolean> {
		const hashedInputPassword = await bcrypt.hash(inputPassword, this.salt);
		return hashedInputPassword === this.password;
	}
}

export default User;
