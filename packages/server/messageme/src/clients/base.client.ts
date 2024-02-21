import axios from 'axios';

export abstract class BaseCommand {
  abstract toPayload(): Record<string, unknown>;
}

export abstract class BaseClient {
  private baseUrl = 'http://221.139.14.136/APIV2/API';

  abstract apiPath: string;

  constructor(private readonly apiKey: string) {}

  protected execute(command: BaseCommand) {
    const url = this.baseUrl + this.apiPath;

    return axios.post(url, {
      api_key: this.apiKey,
      ...command.toPayload(),
    });
  }
}
