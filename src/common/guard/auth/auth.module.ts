import { Module } from '@nestjs/common';
import { AuthModule } from 'src/app/modules/auth.module';

@Module({ imports: [AuthModule], exports: [AuthModule] })
export class AuthGuardModule {}
