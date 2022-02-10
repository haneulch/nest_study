import { Module } from '@nestjs/common';
import { ApiExampleService } from './api-example.service';
import { ApiExampleController } from './api-example.controller';

@Module({
  controllers: [ApiExampleController],
  providers: [ApiExampleService]
})
export class ApiExampleModule {}
