import { Controller, Get, Post, Req } from '@nestjs/common';
import { ApiExampleService } from './api-example.service';
import { Public } from '../auth/jwt-auth.guard';
import { ApiDefaultResponse, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('api-example')
export class ApiExampleController {
  constructor(private apiExampleService: ApiExampleService) {}

  @Public()
  @Get('login')
  @ApiOperation({ summary: 'login api', description: 'login' })
  @ApiQuery({ name: 'userId', type: 'string' })
  @ApiOkResponse({
    description: 'success',
    content: {
      'application/json': {
        examples: {
          userDTO: { summary: 'user dto', description: 'description', value: { username: 'test' } },
          test: { summary: 'test', description: 'bar description', value: { test: '222' } },
        },
      },
    },
  })
  @ApiDefaultResponse({
    status: 400,
    description: 'default',
    content: {
      'application/json': {
        example: { msg: 'fail' },
      },
    },
  })
  login(@Req() request) {
    return this.apiExampleService.login(request.query.userId);
  }

  @Public()
  @Post('search')
  search(@Req() request) {
    return this.apiExampleService.getData(request.body);
  }

  @Public()
  @Get('refreshToken')
  refreshToken(@Req() request) {
    return this.apiExampleService.refresh(request.body.userId);
  }
}
