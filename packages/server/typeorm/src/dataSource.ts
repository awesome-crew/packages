import findUp from 'find-up';
import { DataSource, InstanceChecker } from 'typeorm';

export const DATA_SOURCE_FILE_NAME = '.typeorm.datasource.js';

export async function findRootPath(cwd = __dirname) {
  const path = await findUp(DATA_SOURCE_FILE_NAME, { cwd });

  if (path == null) {
    throw new Error(`@awesome-dev/server-typeorm ERROR:: ${DATA_SOURCE_FILE_NAME} not found`);
  }

  return path;
}

export async function loadDataSource(path: string) {
  const dataSource = (await import(path)).default;

  if (!InstanceChecker.isDataSource(dataSource)) {
    throw new Error(
      `@awesome-dev/server-typeorm ERROR:: Config file's default export must be DataSource instance (${path})`
    );
  }

  return dataSource as DataSource;
}
