import { applyDecorators } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { BaseEvent, parseEventName } from '../base-event';

type TargetEvent = {
  new (...args: any[]): BaseEvent;
};

export function Handler(targetEvent: TargetEvent) {
  return applyDecorators(OnEvent(parseEventName(targetEvent.name)));
}
