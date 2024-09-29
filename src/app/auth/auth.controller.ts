import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UtilsService } from 'src/utils/utils.service';
import { Author } from '../author/entities/author.entity';
import { AuthorService } from '../author/author.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly utilsService: UtilsService,
    private readonly authorService: AuthorService,
  ) {}

  @Post('register')
  async registerUser(
    @Body() { password, username, gender }: Author,
  ): Promise<Author> {
    try {
      const hashedPassword = await this.utilsService.hashPassword(password);
      const userCreated = await this.authorService.create({
        password: hashedPassword,
        username,
        gender,
      });
      return userCreated;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post('login')
  async loginUser(
    @Body() { password, username }: Pick<Author, 'password' | 'username'>,
  ) {
    const user = await this.authorService.findOneByUsername(username);
    if (user) {
      const isValid = await this.utilsService.comparePassword(
        password,
        user.password,
      );
      if (isValid) {
        const token = await this.authService.generateToken(isValid, {
          gender: user.gender,
          id: user.id,
          username: user.username,
          role: 'author',
        });
        return {
          ACCESS_TOKEN: token,
        };
      }
    }
    throw new HttpException(
      'Password or Username are not valid',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
