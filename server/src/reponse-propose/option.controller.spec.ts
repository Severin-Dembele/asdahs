import { Test, TestingModule } from '@nestjs/testing';
import { ReponseProposeController } from './option.controller';
import { ReponseProposeService } from './option.service';

describe('ReponseProposeController', () => {
  let controller: ReponseProposeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReponseProposeController],
      providers: [ReponseProposeService],
    }).compile();

    controller = module.get<ReponseProposeController>(ReponseProposeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
