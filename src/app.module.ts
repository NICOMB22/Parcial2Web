import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedSocialModule } from './redsocial/redsocial.module';
import { UsuarioModule } from './usuario/usuario.module';
import { FotoModule } from './foto/foto.module';
import { AlbumModule } from './album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album/album-entity';
import { FotoEntity } from './foto/foto-entity';
import { RedSocialEntity } from './redsocial/red-social-entity';
import { UsuarioEntity } from './usuario/usuario-entity';
@Module({
  imports: [AlbumModule, FotoModule, RedSocialModule, UsuarioModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'album',
      entities: [
        AlbumEntity,
        FotoEntity,
        RedSocialEntity,
        UsuarioEntity
      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}