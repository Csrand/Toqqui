import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './user/user.module.js';
import { AuthModule } from './auth/auth.module.js';
import { MessageModule } from './message/message.module.js';

@Module({
  imports: [UserModule, AuthModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
