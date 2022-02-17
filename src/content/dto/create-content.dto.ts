import { IsString } from 'class-validator';

export class CreateContentDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly message: string;
}
