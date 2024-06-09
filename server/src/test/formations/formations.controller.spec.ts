import { Test, TestingModule } from '@nestjs/testing';
import { FormationsController } from '../../src/controllers/formations.controller';
import { FormationsService } from '../../src/repositories/formations.service';

describe('FormationsController', () => {
  let controller: FormationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormationsController],
      providers: [FormationsService],
    }).compile();

    controller = module.get<FormationsController>(FormationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
