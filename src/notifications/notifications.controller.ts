import { Controller, Sse } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, map } from 'rxjs';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Sse('sse')
  sseNotifications() {
    return fromEvent(this.eventEmitter, 'task.*').pipe(
      map((data) => {
        return { data };
      }),
    );
  }
}
