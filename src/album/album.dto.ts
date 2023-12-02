import {IsDate, IsNotEmpty, IsString, IsUrl} from 'class-validator';
export class AlbumDto {

    @IsString()
    @IsNotEmpty()
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    readonly titulo: string;
    
    @IsDate()
    @IsNotEmpty()
    readonly fechaFin: Date;
    
    @IsDate()
    @IsNotEmpty()
    readonly fechaInicio: Date;
    
}