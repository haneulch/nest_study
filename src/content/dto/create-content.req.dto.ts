import { IsString } from 'class-validator';

export class CreateContentReqDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly message: string;
}
