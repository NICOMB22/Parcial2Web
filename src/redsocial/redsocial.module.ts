import { Module } from '@nestjs/common';
import { RedSocialService } from './redsocial.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSocialEntity } from './red-social-entity';
import { RedsocialController } from './redsocial.controller';



@Module({
  providers: [RedSocialService],
  imports: [TypeOrmModule.forFeature([RedSocialEntity])],
  controllers: [RedsocialController]
})

export class RedSocialModule {}