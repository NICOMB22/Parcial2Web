import { Body, Controller, Delete, HttpCode, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { FotoService } from './foto.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { FotoDto } from './foto.dto';
import { FotoEntity } from './foto-entity';
import { plainToInstance } from 'class-transformer';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('fotos')
export class FotoController {
  constructor(private readonly fotoService: FotoService) {}

  @Get()
  async findAll() {
    return await this.fotoService.findAllFotos();
  }

  @Get(':fotoId')
  async findFotoById(@Param('fotoId') fotoId: string) {
    return await this.fotoService.findFotoById(fotoId);
  }

  @Post()
  async createFoto(@Body() fotoDto: FotoDto) {
    const foto: FotoEntity = plainToInstance(FotoEntity, fotoDto);
    return await this.fotoService.createFoto(foto);
  }

  @Delete(':fotoId')
  @HttpCode(204)
  async delete(@Param('fotoId') fotoId: string) {
    return await this.fotoService.deleteFoto(fotoId);
  }
}
