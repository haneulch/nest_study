import { IsString } from 'class-validator';

export class PasswordUpdateDto {
  @IsString()
  userId: string;

  @IsString()
  previousPassword: string;

  @IsString()
  password: string;
}
