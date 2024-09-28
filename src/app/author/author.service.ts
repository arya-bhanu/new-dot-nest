import { Injectable } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  async create(payload: Omit<Author, 'id' | 'books'>): Promise<Author> {
    return this.authorsRepository.save(payload);
  }

  async findOneById(id: number) {
    return this.authorsRepository.findOneBy({ id });
  }

  async findOneByUsername(username: string) {
    return this.authorsRepository.findOneBy({ username });
  }
}
