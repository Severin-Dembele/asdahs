import { Test, TestingModule } from '@nestjs/testing';
import { SocietesController } from '../../src/controllers/societes.controller';
import { SocietesService } from '../../src/repositories/societes.service';

describe('SocietesController', () => {
  let controller: SocietesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocietesController],
      providers: [SocietesService],
    }).compile();

    controller = module.get<SocietesController>(SocietesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
