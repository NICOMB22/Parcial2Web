/* eslint-disable prettier/prettier */
import { FotoEntity } from '../foto/foto-entity';
import { AlbumEntity } from '../album/album-entity';
import { Column, ManyToOne, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RedSocialEntity } from 'src/redsocial/red-social-entity';

@Entity()
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  telefono: string;

  @OneToMany(() => FotoEntity, (foto) =>  foto.usuario)
  foto: FotoEntity;

  @ManyToOne(() => RedSocialEntity, (redsocial) =>  redsocial.usuario)
  redsocial: RedSocialEntity;

  @OneToMany(() => AlbumEntity, (album) => album.usuarios)
  album: AlbumEntity;
}