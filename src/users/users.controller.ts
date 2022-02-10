import { Controller, Get, Post, Req } from '@nestjs/common';
import { Public } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { ResponseDto } from '../movies/dto/response-dto';
import { ResponseUtils } from '../util/response.utils';
import { ResultCode } from '../constant/result-code';
import MessageConstant from '../constant/message-constant';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post('create')
  async create(@Req() request) {
    const result = await this.usersService.create(request.body);
    if (result) {
      return ResponseUtils.success();
    }
    return ResponseUtils.error(ResultCode.FGP_0001.toString(), MessageConstant.DUPLICATE_USERNAME);
  }

  @Get(':username')
  async getUserList(@Req() request): Promise<ResponseDto> {
    const data = await this.usersService.findOne(request.params.username);
    return ResponseUtils.success('', data);
  }
}
