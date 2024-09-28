import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}
  create(payload: Omit<Book, 'id'>) {
    return this.booksRepository.save(payload);
  }

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  findOne(id: number): Promise<Book> {
    return this.booksRepository.findOneBy({ id });
  }

  update(id: number, payload: Omit<Book, 'id'>) {
    return this.booksRepository.update({ id }, payload);
  }

  delete(id: number) {
    return this.booksRepository.delete({ id });
  }
}
