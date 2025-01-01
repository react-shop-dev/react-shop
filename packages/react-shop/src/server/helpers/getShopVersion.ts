import fs from 'fs';
import path from 'path';

export const getShopVersion = async () => {
  const packageJson = await fs.promises.readFile(path.join(process.cwd(), 'package.json'), {
    encoding: 'utf-8',
  });
  const { dependencies } = JSON.parse(packageJson);
  return dependencies['react-shop'].replace(/[\^:]/g, '');
};
