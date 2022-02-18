import { IsString } from 'class-validator';

export class LoginReqDto {
  @IsString()
  userId: string;

  @IsString()
  password: string;
}
