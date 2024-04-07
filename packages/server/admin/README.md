# admin

Create AdminAuth, AdminController

## Installation

```bash
$ npm i @awesome-dev/server-admin
```

## Dependencies

@awesome-dev/server-env
@awesome-dev/utils
@awesome-dev/server-aws-s3
jsonwebtoken

## Usage

```bash
@AdminController(CustomEntity)
export class AdminCustomController extends BaseAdminController<CustomEntity> {
  constructor(readonly service: EntityService) {
    super(service);
  }
}
```
env
```bash
ADMIN_USER_ID="userId"
ADMIN_USER_PASSWORD="userPassword"
ADMIN_JWT_SECRET_KEY='JWTSecretKey'
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
