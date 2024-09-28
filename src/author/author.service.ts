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

  async findOne(id: number): Promise<Author> {
    return this.authorsRepository.findOneBy({ id });
  }

  async create(payload: Author): Promise<Author> {
    return this.authorsRepository.create(payload);
  }
}
