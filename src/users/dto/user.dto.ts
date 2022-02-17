import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  userId: string;

  @IsString()
  password: string;

  username: string;

  accountType: string;
}
