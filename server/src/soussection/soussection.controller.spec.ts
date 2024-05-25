import { Test, TestingModule } from '@nestjs/testing';
import { SoussectionController } from './soussection.controller';
import { SoussectionService } from './soussection.service';

describe('SoussectionController', () => {
  let controller: SoussectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoussectionController],
      providers: [SoussectionService],
    }).compile();

    controller = module.get<SoussectionController>(SoussectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
