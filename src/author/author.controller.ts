import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthorService } from './author.service';

import { Author } from './entities/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  create(@Body() createAuthorDto: Author) {
    return this.authorService.create(createAuthorDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(+id);
  }
}
