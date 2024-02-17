import findUp from 'find-up';

export const SRC_SOURCE_FILE_NAMES = ['app.module.ts', 'app.module.js'];

export async function findSrcPath(cwd = __dirname) {
  const path = await findUp(SRC_SOURCE_FILE_NAMES, { cwd });

  if (path == null) {
    throw new Error(`@awesome-dev/server-typeorm ERROR::${SRC_SOURCE_FILE_NAMES} not found`);
  }

  return path;
}
