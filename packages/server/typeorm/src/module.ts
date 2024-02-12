import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { findDataSourcePath, loadDataSource } from './dataSource';

export function loadTypeOrmModule() {
  return TypeOrmModule.forRootAsync({
    imports: [],
    useFactory: async () => {
      const configPath = await findDataSourcePath();
      const config = await loadDataSource(configPath);

      return {
        ...config.options,
      } as TypeOrmModuleOptions;
    },
  });
}
