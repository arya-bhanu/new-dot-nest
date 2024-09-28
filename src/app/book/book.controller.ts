import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Request,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { Roles } from 'src/decorators/roles/roles.decorator';

@Controller('book')
@UseGuards(AuthGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @Roles(['author'])
  create(
    @Body() createBookDto: Omit<Book, 'id' | 'author'>,
    @Request() req: any,
  ) {
    const user = req.user;
    return this.bookService.create({ author: user.id, ...createBookDto });
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Put(':id')
  @Roles(['author'])
  update(@Param('id') id: number, @Body() updateBookDto: Omit<Book, 'id'>) {
    console.log(id);
    console.log(updateBookDto);
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  @Roles(['author'])
  remove(@Param('id') id: number) {
    return this.bookService.delete(id);
  }
}
