import { MigrationRunCommand } from 'typeorm/commands/MigrationRunCommand';
import type { CommandModule } from 'yargs';

import { findDataSourcePath } from './helpers';

export class NewMigrationRunCommand implements CommandModule {
  command = 'migrate';
  describe = 'Runs all pending migrations.';

  async handler() {
    const dataSourcePath = await findDataSourcePath();

    return new MigrationRunCommand().handler({
      dataSource: dataSourcePath,
    });
  }
}
