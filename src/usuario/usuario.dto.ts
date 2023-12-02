import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UsuarioDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  readonly telefono: string;
}
