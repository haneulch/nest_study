import { IsString } from 'class-validator';

export class CreateContentDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly message: string;
}
