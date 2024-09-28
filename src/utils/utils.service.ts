import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilsService {
  async hashPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
