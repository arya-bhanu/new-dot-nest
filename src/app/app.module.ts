import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from 'src/utils/utils.module';
import { AuthGuardModule } from 'src/guard/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE as any) || 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: Boolean(process.env.IS_PROD) ? false : true,
    }),
    UtilsModule,
    BookModule,
    AuthorModule,
    AuthModule,
    AuthGuardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule, ConfigModule],
})
export class AppModule {}
