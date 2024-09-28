import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

@Module({ imports: [AuthModule], exports: [AuthModule] })
export class RolesModule {}
