import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class NotificationsService {
  constructor(private readonly eventEmitter: EventEmitter2) { }
  
  notify(event: string, payload: any) {
    this.eventEmitter.emit(event, payload);
  }
}
