import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedsocialModule } from './redsocial/redsocial.module';
import { UsuarioModule } from './usuario/usuario.module';
import { FotoModule } from './foto/foto.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [RedsocialModule, UsuarioModule, FotoModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
