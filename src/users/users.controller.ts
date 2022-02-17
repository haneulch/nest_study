import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { Public } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { ResponseUtils } from '../util/response.utils';
import { UsernameUpdateDto } from './dto/username-update.dto';
import { PasswordUpdateDto } from './dto/password-update.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() userDto: UserDto) {
    return this.usersService.create(userDto);
  }

  @Put('profile')
  async profile(@Body() usernameUpdateDto: UsernameUpdateDto) {
    await this.usersService.updateUsername(usernameUpdateDto);
    return ResponseUtils.success();
  }

  @Put('password')
  async password(@Body() passwordUpdateDto: PasswordUpdateDto) {
    return this.usersService.updatePassword(passwordUpdateDto);
  }
}
