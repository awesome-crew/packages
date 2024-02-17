import findUp from 'find-up';

export const FILE_NAMES = ['app.module.ts', 'app.module.js'];

export async function findSrcPath(cwd = __dirname) {
  const path = await findUp(FILE_NAMES, { cwd });

  if (path == null) {
    throw new Error(
      `@awesome-dev/server-typeorm ERROR:: Cannot find src path files (${FILE_NAMES.join(', ')})`
    );
  }

  return path;
}
