import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import type { CliOptions } from 'src/types';

export const generateEnvFile = (settings: CliOptions) => {
  const targetDir = process.env.TARGET_DIR!;
  let envContent = '';
  const envFilePath = path.join(targetDir, '.env');

  if (settings.auth) {
    const authSecret = generateAuthSecret();
    envContent = `AUTH_SECRET=${authSecret}`;
  }

  if (envContent) {
    fs.writeFileSync(envFilePath, `# Environment Variables\n${envContent}`);
  }
};

const generateAuthSecret = (): string => {
  return crypto.randomBytes(32).toString('hex');
};
