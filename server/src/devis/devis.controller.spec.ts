import { Test, TestingModule } from '@nestjs/testing';
import { DevisController } from '../controllers/devis.controller';
import { DevisService } from '../repositories/devis.service';

describe('DevisController', () => {
  let controller: DevisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevisController],
      providers: [DevisService],
    }).compile();

    controller = module.get<DevisController>(DevisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
