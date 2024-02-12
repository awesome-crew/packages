import { MigrationGenerateCommand } from 'typeorm/commands/MigrationGenerateCommand';
import type { CommandModule, Argv, Arguments } from 'yargs';

import { findDataSourcePath } from './helpers';

export class NewMigrationGenerateCommand implements CommandModule {
  command = 'makemigrations <path>';
  describe = 'Generates a new migration file with sql needs to be executed to update schema.';

  builder(args: Argv) {
    return args.positional('path', {
      type: 'string',
      describe: 'Path of the migration file',
      demandOption: true,
    });
  }

  async handler(args: Arguments<any & { path: string }>) {
    const dataSourcePath = await findDataSourcePath();

    return new MigrationGenerateCommand().handler({
      ...args,
      dataSource: dataSourcePath,
    });
  }
}
