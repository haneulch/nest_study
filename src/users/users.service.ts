import { Injectable } from '@nestjs/common';
import { BcryptService } from '../util/bcrypt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseUtils } from '../util/response.utils';
import { ResultCode } from '../constant/result-code';
import MessageConstant from '../constant/message-constant';
import { CommonUtils } from '../util/common.utils';
import { User } from './entities/user.entity';
import { UsernameUpdateReqDto } from './dto/username-update.req.dto';
import { PasswordUpdateReqDto } from './dto/password-update.req.dto';
import { CreateUserReqDto } from './dto/create-user.req.dto';

@Injectable()
export class UsersService {
  constructor(
    private bcryptService: BcryptService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findOne(userId: string) {
    return this.userRepository.findOne(userId);
  }

  checkIdExist(userId: string) {
    return this.userRepository.find({
      select: ['userId'],
      where: { userId },
    });
  }

  async create(param: CreateUserReqDto) {
    if (!param.accountType) {
      const user = await this.checkIdExist(param.userId);
      if (user?.length > 0) {
        return ResponseUtils.error(ResultCode.DKY_0001, MessageConstant.DUPLICATE_USERNAME);
      }
    }

    param.password = await this.bcryptService.encryptText(param.password);
    param.username = CommonUtils.randomUsername();
    await this.userRepository.insert(param);
    return ResponseUtils.success();
  }

  updateUsername(param: UsernameUpdateReqDto) {
    return this.userRepository.update(param.userId, { username: param.username });
  }

  async updatePassword(param: PasswordUpdateReqDto) {
    const user: User = await this.userRepository.findOne(param.userId);
    if (!user) {
      return ResponseUtils.error(ResultCode.DKY_0002, MessageConstant.WRONG_LOGIN_INFO);
    }

    const isMatch = await this.bcryptService.isMatch(param.previousPassword, user.password);
    if (!isMatch) {
      return ResponseUtils.error(ResultCode.DKY_0002, MessageConstant.WRONG_LOGIN_INFO);
    }

    const password = await this.bcryptService.encryptText(param.password);
    await this.userRepository.update(param.userId, { password });
    return ResponseUtils.success();
  }
}
