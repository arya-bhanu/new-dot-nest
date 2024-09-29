import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthorModule } from '../author/author.module';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [UtilsModule, AuthorModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
