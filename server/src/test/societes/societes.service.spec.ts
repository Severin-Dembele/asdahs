import { Test, TestingModule } from '@nestjs/testing';
import { SocietesService } from '../../src/repositories/societes.service';

describe('SocietesService', () => {
  let service: SocietesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocietesService],
    }).compile();

    service = module.get<SocietesService>(SocietesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
