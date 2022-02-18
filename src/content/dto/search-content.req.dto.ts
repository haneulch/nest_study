import { IsString } from 'class-validator';

export class SearchContentReqDto {
  @IsString()
  readonly message: string;

  @IsString()
  readonly userId: string;
}
