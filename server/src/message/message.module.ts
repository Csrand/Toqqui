import { Module } from '@nestjs/common';
import { MessageService } from './message.service.js';
import { MessageGateway } from './message.gateway.js';

@Module({
  providers: [MessageGateway, MessageService],
})
export class MessageModule {}
