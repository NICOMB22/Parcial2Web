import { Module } from '@nestjs/common';
import { RedsocialService } from './redsocial.service';

@Module({
  providers: [RedsocialService]
})
export class RedsocialModule {}
