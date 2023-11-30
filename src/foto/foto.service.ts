import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto-entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-errors';

@Injectable()
export class FotoService {
  constructor(
    @InjectRepository(FotoEntity)
    private readonly fotoRepository: Repository<FotoEntity>, // Modificado a camelCase
  ) {}

  async createFoto(foto: FotoEntity): Promise<FotoEntity> {
    if (foto.ISO > 6400 || foto.ISO < 100) {
      throw new Error('El valor ISO debe estar entre 100 y 6400.');
    }

    if (foto.velObturacion > 250 || foto.velObturacion < 2) {
        throw new Error('La velocidad de obturación debe estar entre 2 y 250.');
    }
    
    if (foto.apertura > 32 || foto.apertura < 1) {
        throw new Error('La apertura debe estar entre 1 y 32.');
    }

    return await this.fotoRepository.save(foto);
  }

  async findAllFotos(): Promise<FotoEntity[]> {
    return await this.fotoRepository.find({});
  }

  async findFotoById(id: string): Promise<FotoEntity> {
    const foto = await this.fotoRepository.findOne({
      where: { id },
    });
    
    if (!foto) {
      throw new BusinessLogicException(
        'La foto con el id especificado no existe',
        BusinessError.NOT_FOUND,
      );
    }

    return foto;
  }

  async deleteFoto(id: string) {
    const foto = await this.fotoRepository.findOne({where: {id}});
    if (!foto) {
      throw new BusinessLogicException(
        'La foto con el id especificado no existe',
        BusinessError.NOT_FOUND
      );
    }
 
    await this.fotoRepository.remove(foto); 
  }
}
