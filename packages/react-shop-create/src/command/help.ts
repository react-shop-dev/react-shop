import chalk from 'chalk';
import { type Command } from 'commander';

export const showHelp = (program: Command) => {
  return program.addHelpText(
    'after',
    `
Examples:
  🚀 Create a new project:
  ${chalk.blueBright('npx react-shop-create my-shop')}
  🔒 Create a project with authentication:
  ${chalk.blueBright('npx react-shop-create my-shop --auth')}
  🔥 Full setup with auth, seed, linter and Material UI:
  ${chalk.blueBright('npx react-shop-create my-shop --auth --seed --linter biome --ui material')}
`,
  );
};
