import { CACHE_MANAGER, Controller, Get, Inject, Param, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { Cache } from 'cache-manager';
import { JwtRefreshAuthGuard } from './auth/jwt-refresh-auth.guard';
import { ResponseUtils } from './util/response.utils';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Public()
  @Get()
  home(): string {
    return 'test app.controller';
  }

  @Public()
  @Post('/auth/login')
  async login(@Req() request, @Res({ passthrough: true }) response) {
    const { accessToken, refreshToken, cookieOption } = await this.authService.login(request.body);
    response.cookie('TOKEN', refreshToken, cookieOption);

    console.log(refreshToken);
    return { accessToken };
  }

  @Public()
  @Get('/auth/logout/:username')
  async logout(@Param() params) {
    this.cacheManager.del(params.username);
    return ResponseUtils.success();
  }

  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Get('/auth/refresh')
  async refresh(@Req() request, @Res({ passthrough: true }) response) {
    const { accessToken, refreshToken, cookieOption } = await this.authService.refresh(request.body.username);
    response.cookie('TOKEN', refreshToken, cookieOption);
    return { accessToken };
  }

  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get('/cache/:username')
  async getCache(@Param() params) {
    return await this.cacheManager.get(params.username);
  }
}
