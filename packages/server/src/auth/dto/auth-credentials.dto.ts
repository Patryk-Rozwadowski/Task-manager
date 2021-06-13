import { IsString, Matches, MaxLength, MinLength } from "class-validator";

/* 	1 Upper case letter
 	1 Lower case letter
 	1 number or special character
*/
const authRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

class AuthCredentialsDto {
   @IsString()
   @MinLength(4)
   @MaxLength(15)
   username: string;

   @IsString()
   @MinLength(5)
   @MaxLength(15)
   @Matches(authRegex, { message: "Password too weak." })
   password: string;
}

export default AuthCredentialsDto;
