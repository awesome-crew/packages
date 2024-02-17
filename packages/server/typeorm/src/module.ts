import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { findDataSourcePath, loadDataSource } from './dataSource';
import { findSrcPath } from './findSrcPath';

export function loadTypeOrmModule() {
  return TypeOrmModule.forRootAsync({
    imports: [],
    useFactory: async () => {
      const configPath = await findDataSourcePath();
      const config = await loadDataSource(configPath);

      const srcPath = await findSrcPath();

      return {
        ...config.options,
        entities: [srcPath + '/**/*.entity.ts', srcPath + '/**/*.entity.js'],
        migrations: [srcPath + '/database/migrations/*.ts', srcPath + '/database/migrations/*.js'],
      } as TypeOrmModuleOptions;
    },
  });
}
