/* eslint-disable prettier/prettier */
import { RedSocialEntity } from 'src/redsocial/red-social-entity';
import { UsuarioEntity } from '../usuario/usuario-entity';
import { Column, Entity, Long, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AlbumEntity } from 'src/album/album-entity';

@Entity()
export class FotoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Long;

  @Column()
  ISO: number;

  @Column()
  velObturacion: number;

  @Column()
  apertura: number;

  @Column()
  fecha: Date;

  @ManyToOne(() => RedSocialEntity, redsocial => redsocial.foto)
  redsocial: RedSocialEntity;

  @ManyToOne(() => UsuarioEntity, (usuario) =>  usuario.foto)
  usuario: UsuarioEntity;

  @ManyToOne(() => AlbumEntity, (album) =>  album.fotos)
  album: AlbumEntity;
}