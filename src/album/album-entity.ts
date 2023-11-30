/* eslint-disable prettier/prettier */
import { UsuarioEntity } from '../usuario/usuario-entity';
import { FotoEntity } from '../foto/foto-entity';
import { Column, Entity, Long, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Long;

  @Column()
  titulo: string;

  @Column()
  fechaFin: Date;

  @Column()
  fechaInicio: Date;

  @OneToMany(() => UsuarioEntity, (usuario) =>  usuario.album)
  usuarios: UsuarioEntity[];

  @OneToMany(() => FotoEntity, (foto) => foto.album)
  fotos: FotoEntity[];
}