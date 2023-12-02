import { IsNumber, IsNotEmpty, IsDate, Min, Max, IsString } from 'class-validator';

export class FotoDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(100)
  @Max(6400)
  readonly ISO: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(2)
  @Max(250)
  readonly velObturacion: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(32)
  readonly apertura: number;

  @IsNotEmpty()
  @IsDate()
  readonly fecha: Date;
}
