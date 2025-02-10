import path from 'path';
import fs from 'fs';
import figlet from 'figlet';
import { Argument, type Command } from 'commander';

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const VERSION = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')).version;

export const setup = (program: Command) => {
  return program
    .name('react-shop-create')
    .version(VERSION, '-v, --version', 'Display the current version')
    .description(figlet.textSync('react shop'))
    .usage('<app-name> [options]')
    .addArgument(new Argument('<app-name>', 'Name of your store'))
    .allowUnknownOption(false);
};
