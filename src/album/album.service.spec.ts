import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album-entity';
import { FotoEntity } from '../foto/foto-entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>
  let fotoRepository: Repository<FotoEntity>
  let albumsList: AlbumEntity[];
  let fotosList: FotoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService, Repository<FotoEntity>],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(
      getRepositoryToken(AlbumEntity),
    );
    fotoRepository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    await fotoRepository.clear();
    albumsList = [];
    fotosList = []; 
  
    for (let i = 0; i < 5; i++) {
      const album: AlbumEntity = await repository.save({
        titulo: faker.lorem.sentence(),
        fechaInicio: faker.date.past(),
        fechaFin: faker.date.future(),
      });
      albumsList.push(album);
  
      const foto: FotoEntity = await fotoRepository.save({
        ISO: faker.number.int({ min: 100, max: 6400 }),
        velObturacion: faker.number.int({ min: 2, max: 250 }), 
        apertura: faker.number.int({ min: 1, max: 32 }), 
        fecha: faker.date.past(),
      });
      fotosList.push(foto);
    }
  };
  

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //prueba create caso positivo
  it('create deberia retornar un album', async () => {
    const album: AlbumEntity = {
      id: faker.string.uuid(),
      titulo: faker.lorem.sentence(),
      fechaFin: faker.date.past(),
      fechaInicio: faker.date.past(),
      usuarios: [],
      fotos: [],
    };
    const newAlbum: AlbumEntity = await service.createAlbum(album);
    expect(newAlbum).not.toBeNull();

    const storedAlbum: AlbumEntity = await repository.findOne({
      where: { id: newAlbum.id },
    });
    expect(album.titulo).toEqual(storedAlbum.titulo);
    expect(album.fechaFin).toEqual(storedAlbum.fechaFin);
    expect(album.fechaInicio).toEqual(storedAlbum.fechaInicio);
  });

  //prueba create caso negativo
  it('create debería lanzar una excepción cuando no tiene titulo', async () => {
    const albumNoTitulo: AlbumEntity = {
      id: faker.string.uuid(),
      titulo: '',
      fechaFin: faker.date.past(),
      fechaInicio: faker.date.past(),
      usuarios: [],
      fotos: []
    };

    await expect(
      service.createAlbum(albumNoTitulo),
    ).rejects.toHaveProperty(
      'message',
      'El nombre del álbum es obligatorio.',
    );
  });
  
  //prueba delete caso positivo
  it('delete debería eliminar un Album', async () => {
    const Album: AlbumEntity = albumsList[0];
    await service.deleteAlbum(Album.id);
    const deletedAlbum: AlbumEntity = await repository.findOne({
      where: { id: Album.id },
    });
    expect(deletedAlbum).toBeNull();
  });
  
  //prueba delete caso negativo
  it('delete debería lanzar una excepción por Album invalido', async () => {
    await expect(() => service.deleteAlbum('0')).rejects.toHaveProperty(
      'message',
      'El álbum con el ID especificado no existe',
    );
  });

  //prueba find album by id caso positivo
  it('findAlbumById debería retornar un álbum existente', async () => {
    const expectedAlbum: AlbumEntity = albumsList[0]; 
    const foundAlbum: AlbumEntity = await service.findAlbumById(expectedAlbum.id);
    expect(foundAlbum).not.toBeNull();
    expect(foundAlbum.id).toEqual(expectedAlbum.id);
  });
  
  //prueba find album by id caso negativo
  it('findAlbumById debería lanzar una excepción por un ID de álbum inexistente', async () => {
    const nonExistingId = 'id_inexistente';
    await expect(service.findAlbumById(nonExistingId)).rejects.toHaveProperty(
      'message',
      'El Album con el ID especificado no existe'
    );
  });
  
  //prueba add photo to album caso positivo
  it('addPhotoToAlbum debería añadir una foto a un álbum existente', async () => {
    const album: AlbumEntity = albumsList[0]; // Asegúrate de que este álbum esté en tu lista de pruebas
    const foto: FotoEntity = fotosList[0]; // Asegúrate de que esta foto esté en tu lista de pruebas
  
    const updatedAlbum: AlbumEntity = await service.addPhotoToAlbum(album.id, foto.id);
    expect(updatedAlbum.fotos).toContainEqual(foto);
  });
  

  //prueba add photo to album caso negativo
  it('addPhotoToAlbum debería lanzar una excepción si el álbum no existe', async () => {
    const nonExistingAlbumId = 'id_album_inexistente';
    const existingFotoId = fotosList[0].id; 
  
    await expect(service.addPhotoToAlbum(nonExistingAlbumId, existingFotoId)).rejects.toHaveProperty(
      'message',
      'El álbum no existe'
    );
  });
  
  
});

