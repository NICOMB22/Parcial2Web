import { Test, TestingModule } from '@nestjs/testing';
import { RedSocialService } from './redsocial.service';
import { RedSocialEntity } from './red-social-entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('RedSocialService', () => {
  let service: RedSocialService;
  let repository: Repository<RedSocialEntity>;
  let redSocialList: RedSocialEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RedSocialService],
    }).compile();

    service = module.get<RedSocialService>(RedSocialService);
    repository = module.get<Repository<RedSocialEntity>>(
      getRepositoryToken(RedSocialEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    redSocialList = [];
    for (let i = 0; i < 5; i++) {
      const redSocial: RedSocialEntity = await repository.save({
        nombre: faker.lorem.sentence(),
        slogan: faker.lorem.sentence(15),
      });
      redSocialList.push(redSocial);
    }
  };

  // Caso positivo: crear red social
  it('createLibreria deberia crear red social', async () => {
    const redSocial: RedSocialEntity = {
      id: faker.string.uuid(),
      nombre: faker.lorem.sentence(),
      slogan: faker.lorem.sentence(15),
      usuario: undefined,
      foto: undefined
    };

    const newRedSocial: RedSocialEntity = await service.createLibreria(redSocial);
    expect(newRedSocial).not.toBeNull();

    const storedRedSocial: RedSocialEntity = await repository.findOne({
      where: { id: newRedSocial.id },
    });
    expect(redSocial.nombre).toEqual(storedRedSocial.nombre);
    expect(redSocial.slogan).toEqual(storedRedSocial.slogan);
  });

  // Caso negativo: slogan vacío
  it('createLibreria deberia lanzar excepcion', async () => {
    const redSocialWithEmptySlogan: RedSocialEntity = {
      id: faker.string.uuid(),
      nombre: faker.lorem.sentence(),
      slogan: '',
      usuario: undefined,
      foto: undefined
    };

    await expect(
      service.createLibreria(redSocialWithEmptySlogan),
    ).rejects.toHaveProperty(
      'message',
      'El slogan no debe estar vacio',
    );
  });

  // Caso negativo: slogan demasiado corto
  it('createLibreria deberia lanzar excepcion', async () => {
    const redSocialWithShortSlogan: RedSocialEntity = {
      id: faker.string.uuid(),
      nombre: faker.lorem.sentence(),
      slogan: 'Corto',
      usuario: undefined,
      foto: undefined
    };

    await expect(
      service.createLibreria(redSocialWithShortSlogan),
    ).rejects.toHaveProperty(
      'message',
      'El slogan debe tener mas de 10 caracteres',
    );
  });
});
