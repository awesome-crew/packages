import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  TypeOrmModule as _TypeOrmModule,
  TypeOrmModuleOptions,
  getDataSourceToken,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { Repository } from './interfaces';
import { getEntityByRepository } from './utils';

import { findRootPath, loadDataSource } from './dataSource';
import { findSrcPath } from './findSrcPath';

function getProviders(repositories: Repository[]): Provider[] {
  return repositories.map(repository => {
    const entity = getEntityByRepository(repository);

    return {
      provide: repository,
      useFactory: (dataSource: DataSource) => {
        return new repository(entity, dataSource.manager);
      },
      inject: [getDataSourceToken()],
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

  static forFeature(repositories: Repository[]): DynamicModule {
    const providers = getProviders(repositories);

    return {
      module: TypeOrmModule,
      providers,
      exports: providers,
      imports: [_TypeOrmModule.forFeature(repositories.map(getEntityByRepository))],
    };
  }
}
