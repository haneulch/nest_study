import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UtilModule } from '../util/util.module';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';

@Module({
  providers: [UsersService],
  imports: [UtilModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
