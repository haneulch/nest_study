import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UtilModule } from '../util/util.module';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    UtilModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_ACCESS_TOKEN_EXPIRE')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, JwtRefreshStrategy, JwtRefreshAuthGuard],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
