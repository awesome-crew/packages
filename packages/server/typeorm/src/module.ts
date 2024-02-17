import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  TypeOrmModule as _TypeOrmModule,
  TypeOrmModuleOptions,
  getDataSourceToken,
  getCustomRepositoryToken,
} from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import { Repository } from './interfaces';
import { getEntityByRepository } from './utils';

import { findRootPath, loadDataSource } from './dataSource';
import { findSrcPath } from './findSrcPath';

function getProviders(
  repositories: Repository[],
  dataSource?: string | DataSource | DataSourceOptions
): Provider[] {
  return repositories.map(repository => {
    const entity = getEntityByRepository(repository);

    return {
      module: TypeOrmModule,
      provide: getCustomRepositoryToken(repository),
      useFactory: (dataSource: DataSource) => {
        return new repository(entity, dataSource.manager);
      },
      inject: [getDataSourceToken(dataSource)],
    } as Provider<any>;
  });
}

@Module({})
export class TypeOrmModule {
  static forRootAsync(dirName: string) {
    return _TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: async () => {
        const configPath = await findRootPath(dirName);
        const config = await loadDataSource(configPath);

        const srcPath = await findSrcPath(dirName);

        return {
          ...config.options,
          entities: [srcPath + '/**/*.entity.ts', srcPath + '/**/*.entity.js'],
          migrations: [
            srcPath + '/database/migrations/*.ts',
            srcPath + '/database/migrations/*.js',
          ],
        } as TypeOrmModuleOptions;
      },
      inject: [],
    });
  }

  static forFeature(
    repositories: Repository[],
    dataSource?: string | DataSource | DataSourceOptions
  ): DynamicModule {
    return {
      module: TypeOrmModule,
      providers: getProviders(repositories, dataSource),
      exports: getProviders(repositories, dataSource),
    };
  }
}
