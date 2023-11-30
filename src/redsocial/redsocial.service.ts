import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RedSocialEntity } from './red-social-entity';
import { InjectRepository } from '@nestjs/typeorm/dist';

import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-errors';

@Injectable()
export class RedSocialService {
  constructor(
    @InjectRepository(RedSocialEntity)
    private readonly RedSocialRepository: Repository<RedSocialEntity>,
  ) {}

  async createLibreria(redSocial: RedSocialEntity): Promise<RedSocialEntity> {
    if (!redSocial.slogan){
      throw new Error('El slogan no debe estar vacio');
    }

    else if (redSocial.slogan.length <= 10) {
        throw new Error('El slogan no debe estar vacio');
      }

    return await this.RedSocialRepository.save(redSocial);
  }
}