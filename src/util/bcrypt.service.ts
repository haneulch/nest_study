import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService {
  async encryptText(text: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(text, saltOrRounds);
  }

  isMatch(text: string, target: string) {
    return bcrypt.compare(text, target);
  }
}
