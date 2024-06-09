import { Test, TestingModule } from '@nestjs/testing';
import { AssetsController } from '../../src/controllers/assets.controller';
import { AssetsService } from '../../src/repositories/assets.service';

describe('AssetsController', () => {
  let controller: AssetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetsController],
      providers: [AssetsService],
    }).compile();

    controller = module.get<AssetsController>(AssetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
