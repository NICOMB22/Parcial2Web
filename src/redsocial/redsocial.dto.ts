import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RedSocialDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  readonly slogan: string;
}
