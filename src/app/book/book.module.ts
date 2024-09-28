import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuardModule } from 'src/guard/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), AuthGuardModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [TypeOrmModule],
})
export class BookModule {}
