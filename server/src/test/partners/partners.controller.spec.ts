import { Test, TestingModule } from '@nestjs/testing';
import { PartnersController } from '../../src/controllers/partners.controller';
import { PartnersService } from '../../src/repositories/partners.service';

describe('PartnersController', () => {
  let controller: PartnersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnersController],
      providers: [PartnersService],
    }).compile();

    controller = module.get<PartnersController>(PartnersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
