import { Body, Controller, Post, Put } from '@nestjs/common';
import { Public } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { ResponseUtils } from '../util/response.utils';
import { UsernameUpdateReqDto } from './dto/username-update.req.dto';
import { PasswordUpdateReqDto } from './dto/password-update.req.dto';
import { CreateUserReqDto } from './dto/create-user.req.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() body: CreateUserReqDto) {
    return this.usersService.create(body);
  }

  @Put('profile')
  async profile(@Body() body: UsernameUpdateReqDto) {
    await this.usersService.updateUsername(body);
    return ResponseUtils.success();
  }

  @Put('password')
  async password(@Body() body: PasswordUpdateReqDto) {
    return this.usersService.updatePassword(body);
  }
}
