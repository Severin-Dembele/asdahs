import { Test, TestingModule } from '@nestjs/testing';
import { ReponseProposeService } from './option.service';

describe('ReponseProposeService', () => {
  let service: ReponseProposeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReponseProposeService],
    }).compile();

    service = module.get<ReponseProposeService>(ReponseProposeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
