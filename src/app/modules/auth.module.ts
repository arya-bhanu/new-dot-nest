import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../core/auth/auth.controller';
import { AuthorModule } from './author.module';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [UtilsModule, AuthorModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
