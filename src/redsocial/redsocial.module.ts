import { Module } from '@nestjs/common';
import { RedSocialService } from './redsocial.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSocialEntity } from './red-social-entity';
import { RedSocialController } from './redsocial.controller';



@Module({
  providers: [RedSocialService],
  imports: [TypeOrmModule.forFeature([RedSocialEntity])],
  controllers: [RedSocialController]
})

export class RedSocialModule {}