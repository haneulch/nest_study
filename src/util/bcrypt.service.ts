import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService {
  async encryptText(text: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(text, saltOrRounds);
  }

  async isMatch(text: string, hash: string) {
    return await bcrypt.compare(text, hash);
  }
}
