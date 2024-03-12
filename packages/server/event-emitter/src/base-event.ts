import { toKebabCase } from '@awesome-dev/utils';

export abstract class BaseEvent<Payload = unknown> {
  constructor(public readonly payload: Payload) {}
}

export function parseEventName(name: string) {
  return toKebabCase(name.replace('Event', ''));
}
