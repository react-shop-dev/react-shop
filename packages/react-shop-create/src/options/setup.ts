import { type Command, Option } from 'commander';
import { LINTER_CHOICES, UI_CHOICES } from 'src/constants';

export const addOptions = (program: Command) => {
  return program
    .option('--descr <desription>', 'Enter description of your site')
    .addOption(new Option('--auth', 'Include authentication in the project').default(undefined))
    .addOption(new Option('--seed', 'Seed fake data into the project').default(undefined))
    .addOption(
      new Option('--uiLib <library>', 'Select UI library')
        .choices(Object.keys(UI_CHOICES))
        .default(undefined),
    )
    .addOption(
      new Option('--linter <linter>', 'Select Linter')
        .choices(Object.keys(LINTER_CHOICES))
        .default(undefined),
    );
};
