import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), RolesModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [TypeOrmModule],
})
export class BookModule {}
