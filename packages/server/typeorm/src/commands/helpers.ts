import chalk from 'chalk';

import { findRootPath as _findRootPath } from '../dataSource';

function logCmdError(prefix: string, err?: any) {
  console.log(chalk.black.bgRed(prefix));

  if (err) {
    console.error(err);
  }
}

export function findDataSourcePath() {
  try {
    return _findRootPath();
  } catch (err) {
    logCmdError('Error during dataSource finding:', err);

    process.exit(1);
  }
}
