import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { TodoModule } from './todo/todo.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ThrottlerModule.forRoot({ ttl: 5, limit: 2}), ConfigModule.forRoot({ isGlobal: true}), AuthModule, UserModule, PrismaModule, TodoModule],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard}]
})
export class AppModule {}
