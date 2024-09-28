import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Author } from '../author/entities/author.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  generateToken(
    isAuthorized: boolean,
    payload: { role: string } & Pick<Author, 'id' | 'username' | 'gender'>,
  ) {
    if (isAuthorized) {
      return this.jwtService.signAsync(payload);
    }
  }
}
