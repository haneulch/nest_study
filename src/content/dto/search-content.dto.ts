import { IsString } from 'class-validator';

export class SearchContentDto {
  @IsString()
  readonly message: string;

  @IsString()
  readonly username: string;
}
