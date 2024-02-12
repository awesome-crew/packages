import { MigrationRevertCommand } from 'typeorm/commands/MigrationRevertCommand';
import type { CommandModule } from 'yargs';

import { findDataSourcePath } from './helpers';

export class NewMigrationRevertCommand implements CommandModule {
  command = 'migrate:revert';
  describe = 'Reverts last executed migration.';

  async handler() {
    const dataSourcePath = await findDataSourcePath();

    return new MigrationRevertCommand().handler({
      dataSource: dataSourcePath,
    });
  }
}
