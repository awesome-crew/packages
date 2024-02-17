import findUp from 'find-up';
import path from 'path';

export const SRC_SOURCE_FILE_NAMES = ['app.module.ts', 'app.module.js'];

export async function findSrcPath(cwd = __dirname) {
  const _filePath = await findUp(SRC_SOURCE_FILE_NAMES, { cwd });

  if (_filePath == null) {
    throw new Error(`@awesome-dev/server-typeorm ERROR::${SRC_SOURCE_FILE_NAMES} not found`);
  }

  return path.dirname(_filePath);
}
