import { Command } from 'commander';
import path from 'path';
import { setup, showHelp, hooks } from './command';
import { runPromts, addOptions } from './options';
import {
  copyTemplates,
  generateEnvFile,
  createConfigFile,
  complileFiles,
  installDeps,
  format,
} from './settings';
import { handleConsoleError, sanitizeAppName } from './utils';
import type { CliOptions } from './types';

const init = () => {
  const program = new Command();

  setup(program);
  addOptions(program);
  showHelp(program);

  program.action(action);

  hooks(program);

  if (process.argv.length < 3) {
    program.help();
  }

  program.parse(process.argv);
};

async function action(appName: string, options: CliOptions) {
  const appDirName = sanitizeAppName(appName);
  const targetDir = path.resolve(process.cwd(), appDirName);
  process.env.TARGET_DIR = targetDir;

  try {
    const settings = await runPromts(options);

    copyTemplates(settings);

    generateEnvFile(settings);

    createConfigFile(settings, appDirName);

    complileFiles(settings);

    await installDeps(settings, appDirName);

    await format(settings.linter);
  } catch (error: unknown) {
    handleConsoleError(error);
  }
}

init();
