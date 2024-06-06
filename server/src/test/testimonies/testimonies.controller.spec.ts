import { Test, TestingModule } from '@nestjs/testing';
import { TestimoniesController } from '../../src/controllers/testimonies.controller';
import { TestimoniesService } from '../../src/repositories/testimonies.service';

describe('TestimoniesController', () => {
  let controller: TestimoniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestimoniesController],
      providers: [TestimoniesService],
    }).compile();

    controller = module.get<TestimoniesController>(TestimoniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
