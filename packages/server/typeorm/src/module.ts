import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { findRootPath, loadDataSource } from './dataSource';
import { findSrcPath } from './findSrcPath';

export function loadTypeOrmModule(dirName: string) {
  return TypeOrmModule.forRootAsync({
    imports: [],
    useFactory: async () => {
      const configPath = await findRootPath(dirName);
      const config = await loadDataSource(configPath);

      const srcPath = await findSrcPath(dirName);

      return {
        ...config.options,
        entities: [srcPath + '/**/*.entity.ts', srcPath + '/**/*.entity.js'],
        migrations: [srcPath + '/database/migrations/*.ts', srcPath + '/database/migrations/*.js'],
      } as TypeOrmModuleOptions;
    },
  });
}
