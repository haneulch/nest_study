import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { CryptoService } from '../util/crypto.service';
import { UtilModule } from '../util/util.module';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [UtilModule],
  controllers: [UsersController],
})
export class UsersModule {}
