import { Test, TestingModule } from '@nestjs/testing';
import { ActualitesController } from '../../src/controllers/actualites.controller';
import { ActualitesService } from '../../src/repositories/actualites.service';

describe('ActualitesController', () => {
  let controller: ActualitesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActualitesController],
      providers: [ActualitesService],
    }).compile();

    controller = module.get<ActualitesController>(ActualitesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
