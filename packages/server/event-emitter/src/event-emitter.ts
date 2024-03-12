import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { BaseEvent } from './base-event';

@Injectable()
export class EventEmitter {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  emit(event: BaseEvent) {
    return this.eventEmitter.emit(event.code, event);
  }
}
