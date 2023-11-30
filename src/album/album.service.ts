import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FotoEntity } from 'src/foto/foto-entity';
import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-errors';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async createAlbum(album: AlbumEntity): Promise<AlbumEntity> {
    if (!album.titulo) {
      throw new Error('El nombre del álbum es obligatorio.');
    }

    return await this.albumRepository.save(album);
  }

  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find({});
  }

  async findAlbumById(id: string): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({
      where: { id },
    });
  
    if (!album) {
      throw new BusinessLogicException(
        'El Album con el id especificado no existe',
        BusinessError.NOT_FOUND,
      );
    }
  
    return album;
  }

  async deleteAlbum(id: string) {
    const album = await this.albumRepository.findOne({
      where: { id },
    });
    if (!album) {
      throw new BusinessLogicException(
        "El álbum con el id especificado no existe",
        BusinessError.NOT_FOUND
      );
    }
 
    await this.albumRepository.remove(album); 
  }

  async addPhotoToAlbum(albumId: string, fotoId: string): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({ where: { id: albumId }, relations: ['fotos'] });
    if (!album) {
      throw new BusinessLogicException('El álbum no existe', BusinessError.NOT_FOUND);
    }

    const foto = await this.fotoRepository.findOne({ where: { id: fotoId } });
    if (!foto) {
      throw new BusinessLogicException('La foto no existe', BusinessError.NOT_FOUND);
    }

    foto.album = album;
    await this.fotoRepository.save(foto);

    return this.albumRepository.findOne({ where: { id: albumId }, relations: ['fotos'] });
  }
}
