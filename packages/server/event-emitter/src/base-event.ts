export abstract class BaseEvent<Payload = unknown> {
  public abstract code: string;

  constructor(public readonly payload: Payload) {}
}
