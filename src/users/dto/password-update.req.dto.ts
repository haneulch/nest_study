import { IsString } from 'class-validator';

export class PasswordUpdateReqDto {
  @IsString()
  userId: string;

  @IsString()
  previousPassword: string;

  @IsString()
  password: string;
}
