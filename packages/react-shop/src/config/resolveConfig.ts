import path from 'path';
import fs from 'fs';
import deepmerge from 'deepmerge';
import defaultConfig from './defaultConfig.json';
import type { ShopConfig } from '@type/config';
import { getRootPath } from './getRootPath';

const CONFIG_FILE_NAME = 'shop.config.js';

export const resolveConfig = (): ShopConfig => {
  const rootPath = getRootPath();

  function getResolvedConfigPath() {
    const configPath = path.join(rootPath, CONFIG_FILE_NAME);
    return process.env.NEXT_RUNTIME === 'edge' ? `${configPath}` : path.resolve(configPath);
  }

  try {
    const configPath = getResolvedConfigPath();
    if (fs.lstatSync(configPath)) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const configModule = require(configPath);

      return deepmerge(defaultConfig, { ...configModule, _configReady: true });
    }
    throw Error();
  } catch (e: unknown) {
    console.warn("Couldn't not find shop.config file", e);
    return defaultConfig;
  }
};
