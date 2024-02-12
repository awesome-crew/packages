import { MigrationShowCommand } from 'typeorm/commands/MigrationShowCommand';
import type { CommandModule } from 'yargs';

import { findDataSourcePath } from './helpers';

export class NewMigrationShowCommand implements CommandModule {
  command = 'migrations';
  describe = 'Show all migrations and whether they have been run or not';

  async handler() {
    const dataSourcePath = await findDataSourcePath();

    return new MigrationShowCommand().handler({
      dataSource: dataSourcePath,
    });
  }
}
