# env

Get process.env props

## Installation

```bash
$ npm i @awesome-dev/server-env
```

## Usage

```bash
export interface CustomConfigOption {
  userId: string;
  userPassword: string;
  jwtSecretKey: string;
}

@Injectable()
export class CustomConfig {
  public constructor(private readonly option: CustomConfigOption) {}

  getOption(key: keyof CustomConfigOption) {
    return this.option[key];
  }
}
```

```bash
@Module({})
export class CustomModule {
  static forRoot(): DynamicModule {
    const config = loadEnv([
      'USER_ID',
      'USER_PASSWORD',
      'JWT_SECRET_KEY',
    ] as const);

    const ConfigProvider: Provider = {
      provide: CustomConfig,
      useFactory: () =>
        new CustomConfig({
          userId: config.USER_ID,
          userPassword: config.USER_PASSWORD,
          jwtSecretKey: config.JWT_SECRET_KEY,
        }),
    };

    return {
      module: CustomModule,
      controllers: [],
      providers: [ConfigProvider],
      exports: [ConfigProvider],
    };
  }
}
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
