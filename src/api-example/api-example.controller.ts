import { Controller } from '@nestjs/common';
import { ApiExampleService } from './api-example.service';

@Controller('api-example')
export class ApiExampleController {
  constructor(private readonly apiExampleService: ApiExampleService) {}
}
