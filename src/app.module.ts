import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookService } from './book/book.service';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'dot_book',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BookModule,
    AuthorModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, BookService],
})
export class AppModule {}
