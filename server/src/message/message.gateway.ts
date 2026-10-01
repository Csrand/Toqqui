import { WebSocketGateway } from '@nestjs/websockets';
import { MessageService } from './message.service.js';

@WebSocketGateway()
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}
}
