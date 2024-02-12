import chalk from 'chalk';

import { findDataSourcePath as _findDataSourcePath } from '../dataSource';

function logCmdError(prefix: string, err?: any) {
  console.log(chalk.black.bgRed(prefix));

  if (err) {
    console.error(err);
  }
}

export function findDataSourcePath() {
  try {
    return _findDataSourcePath();
  } catch (err) {
    logCmdError('Error during dataSource finding:', err);

    process.exit(1);
  }
}
