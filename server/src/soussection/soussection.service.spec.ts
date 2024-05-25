import { Test, TestingModule } from '@nestjs/testing';
import { SoussectionService } from './soussection.service';

describe('SoussectionService', () => {
  let service: SoussectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoussectionService],
    }).compile();

    service = module.get<SoussectionService>(SoussectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
