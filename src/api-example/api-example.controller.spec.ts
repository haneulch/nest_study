import { Test, TestingModule } from '@nestjs/testing';
import { ApiExampleController } from './api-example.controller';
import { ApiExampleService } from './api-example.service';

describe('ApiExampleController', () => {
  let controller: ApiExampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiExampleController],
      providers: [ApiExampleService],
    }).compile();

    controller = module.get<ApiExampleController>(ApiExampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
