import { Body, Controller, Delete,HttpCode,Get,Param,Post,UseInterceptors, } from '@nestjs/common';
import { AlbumService } from './album.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { AlbumDto } from './album.dto';
import { AlbumEntity } from './album-entity';
import { plainToInstance } from 'class-transformer';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':albumId')
  async findAlbumById(@Param('albumId') albumId: string) {
    return await this.albumService.findAlbumById(albumId);
  }

  @Post()
  async createAlbum(@Body() albumDto: AlbumDto) {
    const album: AlbumEntity = plainToInstance(AlbumEntity, albumDto);
    return await this.albumService.createAlbum(album);
  }

  @Delete(':AlbumId')
  @HttpCode(204)
  async delete(@Param('AlbumId') AlbumId: string) {
    return await this.albumService.deleteAlbum(AlbumId);
  }
}