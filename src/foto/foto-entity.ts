/* eslint-disable prettier/prettier */
import { RedSocialEntity } from '../redsocial/red-social-entity';
import { UsuarioEntity } from '../usuario/usuario-entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AlbumEntity } from '../album/album-entity';

@Entity()
export class FotoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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