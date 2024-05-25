import { Test, TestingModule } from '@nestjs/testing';
import { ReponseReponduController } from './reponse-repondu.controller';
import { ReponseReponduService } from './reponse-repondu.service';

describe('ReponseReponduController', () => {
  let controller: ReponseReponduController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReponseReponduController],
      providers: [ReponseReponduService],
    }).compile();

    controller = module.get<ReponseReponduController>(ReponseReponduController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
