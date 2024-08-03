import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class TasksGateway {
  @WebSocketServer()
  server: Server;

  notifyAllClients(event: string, data: any) {
    this.server.emit(event, data);
  }

  notifyClient(clientId: string, event: string, data: any) {
    this.server.to(clientId).emit(event, data);
  }
  
}
