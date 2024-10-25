import { Module } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { BookController } from '../core/book/book.controller';
import { Book } from '../entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuardModule } from 'src/common/guard/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), AuthGuardModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [TypeOrmModule],
})
export class BookModule {}
