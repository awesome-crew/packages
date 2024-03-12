import { toKebabCase } from '@awesome-dev/utils';

export abstract class BaseEvent<Payload = unknown> {
  constructor(public readonly payload: Payload) {}

  static getEventName(event: BaseEvent) {
    return toKebabCase(event.constructor.name.replace('Event', ''));
  }
}
