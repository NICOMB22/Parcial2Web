import { Module } from '@nestjs/common';
import { FotoService } from './foto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoEntity } from './foto-entity';



@Module({
  providers: [FotoService],
  imports: [TypeOrmModule.forFeature([FotoEntity])]
})

export class FotoModule {}