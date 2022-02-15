import { IsString } from 'class-validator';

export class UpdateContentDto {
  @IsString()
  readonly showYn: string;
}
