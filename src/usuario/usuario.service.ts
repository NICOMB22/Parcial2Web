import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario-entity';
import { InjectRepository } from '@nestjs/typeorm/dist';

import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-errors';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly UsuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async createUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    if (usuario.telefono.length != 10) {
      throw new Error('El telefono del usuario debe tener 10 caracteres');
    }

    return await this.UsuarioRepository.save(usuario);
  }
  async findAll(): Promise<UsuarioEntity[]> {
    return await this.UsuarioRepository.find({});
  }

  async findUsuarioById(id: string): Promise<UsuarioEntity> {
    const Usuario: UsuarioEntity = await this.UsuarioRepository.findOne({
      where: { id },
    });
    
    if (!Usuario)
    throw new BusinessLogicException(
      'El Usuario con el id especificado no existe',
      BusinessError.NOT_FOUND,
    );

  return Usuario;
}

}