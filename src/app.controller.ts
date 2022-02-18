import { Body, CACHE_MANAGER, Controller, Get, Inject, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { Cache } from 'cache-manager';
import { JwtRefreshAuthGuard } from './auth/jwt-refresh-auth.guard';
import { LoginResDto } from './users/dto/login.res.dto';
import { ResponseUtils } from './util/response.utils';
import { ResultCode } from './constant/result-code';
import MessageConstant from './constant/message-constant';
import { LoginReqDto } from './users/dto/login.req.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() body: LoginReqDto, @Res({ passthrough: true }) response) {
    const result: LoginResDto = await this.authService.login(body);
    if (result) {
      response.cookie('TOKEN', result.refreshToken, result.cookieOption);
      return ResponseUtils.success(result);
    }
    return ResponseUtils.error(ResultCode.DKY_0002, MessageConstant.WRONG_LOGIN_INFO);
  }

  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh/:userId')
  async refresh(@Param() params, @Res({ passthrough: true }) response) {
    const { accessToken, refreshToken, cookieOption } = await this.authService.refresh(params.userId);
    response.cookie('TOKEN', refreshToken, cookieOption);
    return { accessToken };
  }
}
