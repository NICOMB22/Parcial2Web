import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario-entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;
  let usuariosList: UsuarioEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<UsuarioEntity>>(
      getRepositoryToken(UsuarioEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    usuariosList = [];
    for (let i = 0; i < 5; i++) {
      const usuario: UsuarioEntity = await repository.save({
        nombre: faker.lorem.sentence(),
        telefono: faker.lorem.sentence(),
        foto: undefined,
        redsocial: undefined,
        album: undefined
      });
      usuariosList.push(usuario);
    }
  };

  // Caso positivo: crear usuario
  it('createUsuario deberia retornar usuario nuevo', async () => {
    const usuario: UsuarioEntity = {
      id: faker.string.uuid(),
      nombre: faker.lorem.sentence(),
      telefono: faker.number.int({ min: 1000000000, max: 9999999999 }).toString(),
      foto: undefined,
      redsocial: undefined,
      album: undefined
    };

    const newUsuario: UsuarioEntity = await service.createUsuario(usuario);
    expect(newUsuario).not.toBeNull();

    const storedUsuario: UsuarioEntity = await repository.findOne({
      where: { id: newUsuario.id },
    });
    expect(usuario.nombre).toEqual(storedUsuario.nombre);
    expect(usuario.telefono).toEqual(storedUsuario.telefono);
  });

  // Caso negativo: teléfono con longitud incorrecta
  it('createUsuario debe lanzar excepcion', async () => {
    const usuarioWithIncorrectPhone: UsuarioEntity = {
      id: faker.string.uuid(),
      nombre: faker.lorem.sentence(),
      telefono: '12345',
      foto: undefined,
      redsocial: undefined,
      album: undefined
    };

    await expect(
      service.createUsuario(usuarioWithIncorrectPhone),
    ).rejects.toHaveProperty(
      'message',
      'El telefono del usuario debe tener 10 caracteres',
    );
  });

  // Buscar usuario por ID - caso positivo
  it('findUsuarioById deberia retornar usuario', async () => {
    const expectedUsuario: UsuarioEntity = usuariosList[0]; 
    const foundUsuario: UsuarioEntity = await service.findUsuarioById(expectedUsuario.id);
    expect(foundUsuario).not.toBeNull();
    expect(foundUsuario.id).toEqual(expectedUsuario.id);
  });

  // Buscar usuario por ID - caso negativo
  it('findUsuarioById deberia retornar excepcion', async () => {
    const nonExistingId = 'id_inexistente';
    await expect(service.findUsuarioById(nonExistingId)).rejects.toHaveProperty(
      'message',
      'El Usuario con el id especificado no existe'
    );
  });
});
