import { Module } from '@nestjs/common';
import { RedSocialService } from './redsocial.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSocialEntity } from './red-social-entity';



@Module({
  providers: [RedSocialService],
  imports: [TypeOrmModule.forFeature([RedSocialEntity])]
})

export class RedSocialModule {}