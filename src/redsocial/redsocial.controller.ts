import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { RedSocialService } from './redsocial.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { RedSocialDto } from './redsocial.dto';
import { RedSocialEntity } from './red-social-entity';
import { plainToInstance } from 'class-transformer';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('redsocial')
export class RedSocialController {
  constructor(private readonly redSocialService: RedSocialService) {}

  @Post()
  async createLibreria(@Body() redSocialDto: RedSocialDto) {
    const redSocial: RedSocialEntity = plainToInstance(RedSocialEntity, redSocialDto);
    return await this.redSocialService.createLibreria(redSocial);
  }
}
