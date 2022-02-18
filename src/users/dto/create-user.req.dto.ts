import { IsString } from 'class-validator';

export class CreateUserReqDto {
  @IsString()
  userId: string;

  @IsString()
  password: string;

  username: string;

  accountType: string;
}
