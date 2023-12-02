import { Test, TestingModule } from '@nestjs/testing';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto-entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let fotosList: FotoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    repository = module.get<Repository<FotoEntity>>(
      getRepositoryToken(FotoEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    fotosList = [];
    for (let i = 0; i < 5; i++) {
      const foto: FotoEntity = await repository.save({
        ISO: faker.number.int(),
        velObturacion: faker.number.int(),
        apertura: faker.number.int(),
        fecha: faker.date.past(),
        redsocial: undefined,
        usuario: undefined,
        album: undefined
      });
      fotosList.push(foto);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //create foto caso positivo
  it('createFoto should return a new photo', async () => {
    const foto: FotoEntity = {
      id: faker.string.uuid(),
      ISO: faker.number.int({min: 100, max: 6400}),
      velObturacion: faker.number.int({min: 2, max: 250}),
      apertura: faker.number.int({min: 1, max: 32}),
      fecha: faker.date.past(),
      redsocial: undefined,
      usuario: undefined,
      album: undefined
    };

    const newFoto: FotoEntity = await service.createFoto(foto);
    expect(newFoto).not.toBeNull();

    const storedFoto: FotoEntity = await repository.findOne({
      where: { id: newFoto.id },
    });
    expect(foto.ISO).toEqual(storedFoto.ISO);
    expect(foto.velObturacion).toEqual(storedFoto.velObturacion);
    expect(foto.apertura).toEqual(storedFoto.apertura);
    expect(foto.fecha).toEqual(storedFoto.fecha);
  });

  //create foto caso negativo
  it('create debería lanzar una excepción con el valor de ISO en 90', async () => {
    const fotoWithWrongIso: FotoEntity = {
      id: faker.string.uuid(),
      ISO: 90,
      velObturacion: faker.number.int(),
      apertura: faker.number.int(),
      fecha: faker.date.past(),
      redsocial: undefined,
      usuario: undefined,
      album: undefined
    };

    await expect(
      service.createFoto(fotoWithWrongIso),
    ).rejects.toHaveProperty(
      'message',
      'El valor ISO debe estar entre 100 y 6400.',
    );
  });

  //prueba delete caso positivo
  it('deleteFoto deberia eliminar una foto', async () => {
    const foto: FotoEntity = fotosList[0];
    await service.deleteFoto(foto.id);
    const deletedFoto = await repository.findOne({ where: { id: foto.id } });
    expect(deletedFoto).toBeNull();
  });

  //prueba delete caso negativo
  it('delete debería lanzar una excepción por foto invalido', async () => {
    await expect(() => service.deleteFoto('0')).rejects.toHaveProperty(
      'message',
      'La foto con el id especificado no existe',
    );
  });

  //find foto caso positivo

    it('findFotoById debería retornar una foto existente', async () => {
      const expectedFoto: FotoEntity = fotosList[0]; 
      const foundFoto: FotoEntity = await service.findFotoById(expectedFoto.id);
      expect(foundFoto).not.toBeNull();
      expect(foundFoto.id).toEqual(expectedFoto.id);
    });
    

  //find foto caso negativo
  it('findFotoById debería lanzar una excepción por un ID de una foto inexistente', async () => {
    const nonExistingId = 'id_inexistente';
    await expect(service.findFotoById(nonExistingId)).rejects.toHaveProperty(
      'message',
      'La foto con el id especificado no existe'
    );
  });
});

