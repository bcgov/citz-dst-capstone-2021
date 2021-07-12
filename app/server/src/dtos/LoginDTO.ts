import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

class LoginDTO {
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  // uppercase && lowercase && (numbers or special characters)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  public password: string;
}

export default LoginDTO;
