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
  NotFoundException,
  InternalServerErrorException,
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
  async create(
    @Body() createBookDto: Omit<Book, 'id' | 'author'>,
    @Request() req: any,
  ) {
    try {
      const user = req.user;
      return await this.bookService.create({
        author: user.id,
        ...createBookDto,
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const book = await this.bookService.findOne(id);
    if (book) {
      return book;
    }
    return new NotFoundException('book not found');
  }

  @Put(':id')
  @Roles(['author'])
  async update(
    @Param('id') id: number,
    @Body() updateBookDto: Omit<Book, 'id'>,
  ) {
    const updated = await this.bookService.update(id, updateBookDto);
    if (updated.affected === 0)
      throw new NotFoundException('Data not found, no rows are affected');
    return {
      message: 'Data is updated',
      error: null,
      statusCode: 200,
    };
  }

  @Delete(':id')
  @Roles(['author'])
  async remove(@Param('id') id: number) {
    const deleted = await this.bookService.delete(id);
    if (deleted.affected === 0)
      throw new NotFoundException('Data not found, no rows are affected');
    return {
      message: 'Data is deleted',
      error: null,
      statusCode: 200,
    };
  }
}
