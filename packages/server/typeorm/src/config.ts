import { assert } from '@toss/assert';
import { DataSource, DataSourceOptions } from 'typeorm';

export function createDatasourceConfig(options: DataSourceOptions) {
  const { migrations, entities } = options;

  assert(
    migrations == null && entities == null,
    '다음 옵션은 입력하시면 안됩니다 (migrations, entities)'
  );

  return new DataSource(options);
}
