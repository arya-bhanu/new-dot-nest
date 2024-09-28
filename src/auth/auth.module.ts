import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthorModule } from 'src/author/author.module';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [AuthorModule, BookModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
