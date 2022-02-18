import { IsString } from 'class-validator';

export class UsernameUpdateReqDto {
  @IsString()
  userId: string;

  @IsString()
  username: string;
}
