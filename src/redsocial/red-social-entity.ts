/* eslint-disable prettier/prettier */
import { UsuarioEntity } from '../usuario/usuario-entity';
import { FotoEntity } from '../foto/foto-entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RedSocialEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  slogan: string;

  @OneToMany(() => UsuarioEntity, (usuario) =>  usuario.id)
  usuario: UsuarioEntity;

  @OneToMany(() => FotoEntity, (foto) => foto.id)
  foto: FotoEntity;
}