import fs from 'fs';

const isWindows = process.platform === 'win32';
const realpathSync = isWindows ? fs.realpathSync : fs.realpathSync.native;

export function getRootPath() {
  return process.env.NEXT_RUNTIME === 'edge' ? '.' : realpathSync(`${process.cwd()}`);
}
