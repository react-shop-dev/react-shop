import fs from 'fs';
import path from 'path';
import type { CliOptions } from 'src/types';

const CONFIG_FILE_NAME = 'shop.config.js';

export const createConfigFile = (settings: CliOptions, appDirName: string) => {
  const targetDir = process.env.TARGET_DIR!;
  fs.writeFileSync(
    path.join(targetDir, CONFIG_FILE_NAME),
    `/** @type {import('react-shop').ShopConfig} */
module.exports = {
  title: {
    default: "${appDirNameToTitle(appDirName)}",
    template: "${appDirNameToTitle(appDirName)} | %s",
  },
  ${settings.description ? `description: "${settings.description}",` : ''}
  feature: {
    search: false,
  },
};
`,
  );
};

const capitalize = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const appDirNameToTitle = (input?: string, splitBy = '-') => {
  if (typeof input !== 'string') return '';
  return capitalize(
    input
      .split(splitBy)
      .join(' ')
      .replace(/[^\w-]+/g, ' '),
  );
};
