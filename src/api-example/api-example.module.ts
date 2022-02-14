import { Module } from '@nestjs/common';
import { ApiExampleService } from './api-example.service';
import { ApiExampleController } from './api-example.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ApiExampleExternalService } from './api-example-external.service';

@Module({
  controllers: [ApiExampleController],
  imports: [HttpModule, ConfigModule],
  providers: [ApiExampleService, ApiExampleExternalService],
})
export class ApiExampleModule {}
