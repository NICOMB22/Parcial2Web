import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album-entity';
import { InjectRepository } from '@nestjs/typeorm/dist';
import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-errors';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly AlbumRepository: Repository<AlbumEntity>,
  ) {}

  async createAlbum(album: AlbumEntity): Promise<AlbumEntity> {
    if (!album.titulo) {
      throw new Error('El nombre del álbum es obligatorio.');
    }

    return await this.AlbumRepository.save(album);
  }
  async findAll(): Promise<AlbumEntity[]> {
    return await this.AlbumRepository.find({});
  }

  async findAlbumById(id: string): Promise<AlbumEntity> {
    const Album: AlbumEntity = await this.AlbumRepository.findOne({
      where: { id },
    });

    if (!Album)
      throw new BusinessLogicException(
        'El Album con el id especificado no existe',
        BusinessError.NOT_FOUND,
      );

    return Album;
  }

  async deleteAlbum(id: string) {
    const album: AlbumEntity = await this.AlbumRepository.findOne({where:{id}});
    if (!album)
      throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
 
    await this.AlbumRepository.remove(album); 
}

}