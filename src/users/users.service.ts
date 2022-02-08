import { Injectable } from '@nestjs/common';
import { User } from './user';
import { UserDto } from './user-dto';
import { CryptoService } from '../util/crypto.service';

@Injectable()
export class UsersService {
  constructor(private readonly cryptoService: CryptoService) {}

  private readonly users: User[] = [];

  getMaxId() {
    this.users.sort((user) => user.userId);
    return this.users.length ? this.users[this.users.length - 1].userId + 1 : 1;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async create(userDto: UserDto) {
    if (this.users.find((user) => user.username === userDto.username)) {
      return false;
    }
    const password = await this.cryptoService.encryptText(userDto.password);
    const user: User = {
      userId: this.getMaxId(),
      username: userDto.username,
      password: String(password),
    };
    this.users.push(user);
    return true;
  }

  list() {
    return this.users;
  }
}
