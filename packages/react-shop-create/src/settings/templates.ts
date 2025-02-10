import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { TEMPLATES } from 'src/constants';
import type { CliOptions } from 'src/types';

export const copyTemplates = (settings: CliOptions): void => {
  console.log('Copying template files...');

  copyTemplateFiles(TEMPLATES.starter);

  if (settings.linter === 'eslint') {
    copyTemplateFiles(TEMPLATES.eslint);
  }

  if (settings.linter === 'biome') {
    copyTemplateFiles(TEMPLATES.biome);
  }

  if (settings.auth) {
    copyTemplateFiles(TEMPLATES.auth);
  }

  if (settings.seed) {
    copyTemplateFiles(TEMPLATES.seed);
  }

  if (settings.uiLib === 'material') {
    copyTemplateFiles(TEMPLATES.mui);
  }

  if (settings.uiLib === 'tailwind') {
    copyTemplateFiles(TEMPLATES.tailwind);
  }
  console.log(chalk.green('Template files copied successfully'));
};

const copyTemplateFiles = (directory: string, excludes = ['package.json']) => {
  const templateDir = path.resolve(__dirname, '..', 'templates', directory);
  const targetDir = process.env.TARGET_DIR!;

  fs.copySync(templateDir, targetDir, {
    overwrite: true,
    filter: (src: string) => {
      if (excludes?.some(exclude => src.endsWith(exclude))) {
        return false;
      }
      return true;
    },
  });
};
