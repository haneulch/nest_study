import { Module } from '@nestjs/common';
import { ApiExampleService } from './api-example.service';
import { ApiExampleController } from './api-example.controller';
import { HttpModule } from '@nestjs/axios';
import { ApiExampleExternalService } from './api-example-external.service';

@Module({
  controllers: [ApiExampleController],
  imports: [HttpModule],
  providers: [ApiExampleService, ApiExampleExternalService],
})
export class ApiExampleModule {}
