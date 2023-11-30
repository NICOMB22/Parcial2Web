import { Test, TestingModule } from '@nestjs/testing';
import { RedsocialService } from './redsocial.service';

describe('RedsocialService', () => {
  let service: RedsocialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedsocialService],
    }).compile();

    service = module.get<RedsocialService>(RedsocialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
