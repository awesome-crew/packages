import { applyDecorators } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { BaseEvent } from '../base-event';

export function Handler(event: BaseEvent) {
  return applyDecorators(OnEvent(BaseEvent.getEventName(event)));
}
