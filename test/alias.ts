import path from 'path';
import fs from 'fs';

const packages = fs
  .readdirSync(path.resolve(__dirname, '..', './packages'), { withFileTypes: true })
  .filter(item => item.isDirectory())
  .map(item => item.name);

export const alias = packages.reduce<Record<string, string>>((aliases, dirName) => {
  aliases[`${dirName}`] = path.resolve(__dirname, `./packages/${dirName}/src`);
  return aliases;
}, {});
