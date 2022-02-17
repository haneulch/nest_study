import { IsString } from 'class-validator';

export class UsernameUpdateDto {
  @IsString()
  userId: string;

  @IsString()
  username: string;
}
