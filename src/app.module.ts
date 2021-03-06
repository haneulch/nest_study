import { CacheModule, Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UtilModule } from './util/util.module';
import { ApiExampleModule } from './api-example/api-example.module';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConfigModule } from './mysql-config/mysql-config.module';
import { MysqlConfigService } from './mysql-config/mysql-config.service';
import { ContentModule } from './content/content.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    MoviesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    UtilModule,
    ApiExampleModule,
    TaskModule,
    TypeOrmModule.forRootAsync({
      imports: [MysqlConfigModule],
      useClass: MysqlConfigService,
      inject: [MysqlConfigModule],
    }),
    ContentModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
