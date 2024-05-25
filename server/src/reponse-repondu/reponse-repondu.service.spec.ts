import { Test, TestingModule } from '@nestjs/testing';
import { ReponseReponduService } from './reponse-repondu.service';

describe('ReponseReponduService', () => {
  let service: ReponseReponduService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReponseReponduService],
    }).compile();

    service = module.get<ReponseReponduService>(ReponseReponduService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
