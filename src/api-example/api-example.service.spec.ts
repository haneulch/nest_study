import { Test, TestingModule } from '@nestjs/testing';
import { ApiExampleService } from './api-example.service';

describe('ApiExampleService', () => {
  let service: ApiExampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiExampleService],
    }).compile();

    service = module.get<ApiExampleService>(ApiExampleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
