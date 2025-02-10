import inquirer from 'inquirer';
import { LINTER_CHOICES, UI_CHOICES } from '../constants';
import { mapPromptChoices } from 'src/utils';
import type { CliOptions } from 'src/types';

const descriptionPrompt = async (): Promise<{ description: string }> =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'description',
      message: 'Enter a description for your project (optional):',
      default: '',
    },
  ]);

const linterPrompt = async (): Promise<{ linter: CliOptions['linter'] }> =>
  inquirer.prompt([
    {
      type: 'list',
      name: 'linter',
      message: 'Which linter would you like to use?',
      choices: mapPromptChoices(LINTER_CHOICES),
      default: 'eslint',
    },
  ]);

const authPrompt = async (): Promise<{ auth: boolean }> =>
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'auth',
      message: 'Do you want to set up authentication for this project? (Default: True)',
      default: true,
    },
  ]);

const seedPrompt = async (): Promise<{ seed: boolean }> =>
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'seed',
      message: 'Do you want to seed fake data into your project? (Default: False)',
      default: false,
    },
  ]);

const uiLibPrompt = async (): Promise<{ uiLib: CliOptions['uiLib'] }> =>
  inquirer.prompt([
    {
      type: 'list',
      name: 'uiLib',
      message: 'Which UI library would you like to use?',
      choices: mapPromptChoices(UI_CHOICES),
      default: 'material',
    },
  ]);

type PromptFunction = () => Promise<Record<string, any>>;

const prompts: { key: keyof CliOptions; prompt: PromptFunction }[] = [
  { key: 'description', prompt: descriptionPrompt },
  { key: 'linter', prompt: linterPrompt },
  { key: 'auth', prompt: authPrompt },
  { key: 'seed', prompt: seedPrompt },
  { key: 'uiLib', prompt: uiLibPrompt },
];

export const runPromts = async (options: CliOptions): Promise<CliOptions> => {
  for (const { key, prompt } of prompts) {
    if (!options[key]) {
      options[key] = (await prompt())[key];
    }
  }

  return options;
};
