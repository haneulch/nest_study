import { IsString } from 'class-validator';

export class UpdateContentReqDto {
  @IsString()
  readonly showYn: string;
}
