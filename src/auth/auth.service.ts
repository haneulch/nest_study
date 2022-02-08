import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/user-dto';
import { CryptoService } from '../util/crypto.service';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private async generateToken(username: string) {
    const payload = { username };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRE')}s`,
    });

    const refreshPayload = { username, refresh: true };
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

  async validateUser(userDto: UserDto): Promise<any> {
    const user: User = await this.usersService.findOne(userDto.username);
    const isMatch = await this.cryptoService.isMatch(userDto.password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDto: UserDto) {
    const user = await this.validateUser(userDto);
    if (user) {
      return await this.generateToken(userDto.username);
    }
    console.log('Login Failed');
  }

  async refresh(username) {
    return await this.generateToken(username);
  }
}
