import { assert } from '@toss/assert';
import { DataSource, DataSourceOptions } from 'typeorm';

export function createDatasourceConfig(dirName: string, options: DataSourceOptions) {
  const { migrations, entities } = options;

  assert(
    migrations == null && entities == null,
    '다음 옵션은 입력하시면 안됩니다 (migrations, entities)'
  );

  const srcPath = dirName + '/src';

  return new DataSource({
    ...options,
    entities: [srcPath + '/**/*.entity.ts', srcPath + '/**/*.entity.js'],
    migrations: [srcPath + '/database/migrations/*.ts', srcPath + '/database/migrations/*.js'],
  });
}
