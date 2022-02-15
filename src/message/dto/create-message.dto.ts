import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @IsNumber()
  readonly contentId: number;
}
