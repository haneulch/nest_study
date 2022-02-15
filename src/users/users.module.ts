import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UtilModule } from '../util/util.module';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  imports: [UtilModule],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
