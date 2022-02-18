import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../util/bcrypt.service';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { User } from '../users/entities/user.entity';
import { LoginReqDto } from '../users/dto/login.req.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private async generateToken(userId: string) {
    const payload = { userId };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRE')}s`,
    });

    const refreshPayload = { userId, refresh: true };
    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRE')}s`,
    });

    const cookieOption = {
      domain: this.configService.get('COOKIE_DOMAIN'),
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: (Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRE')) + 32400) * 1000,
    };

    return { accessToken, refreshToken, cookieOption };
  }

  async validateUser(param: LoginReqDto): Promise<boolean> {
    const user: User = await this.usersService.findOne(param.userId);
    if (!user) return false;
    return await this.bcryptService.isMatch(param.password, user?.password);
  }

  async login(param: LoginReqDto) {
    const result = await this.validateUser(param);
    if (!result) return null;
    return await this.generateToken(param.userId);
  }

  async refresh(userId) {
    return await this.generateToken(userId);
  }
}
