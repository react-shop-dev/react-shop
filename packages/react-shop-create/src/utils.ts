import chalk from 'chalk';

export const handleConsoleError = (error: unknown) => {
  if (typeof error === 'object' && error !== null && 'isTtyError' in error) {
    console.error(`${chalk.red('❌ Error')}: Prompt couldn't be rendered in this environment.`);
  } else if (error instanceof Error && error.name === 'ExitPromptError') {
    console.log('\n❌ Setup cancelled. No changes were made.');
  } else {
    console.error('Failed to create the app:', error);
  }
  process.exit(1);
};

export function sanitizeAppName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-');
}

export const mapPromptChoices = (value: Record<string, any>) =>
  Object.entries(value).map(([key, value]) => ({
    value: key,
    name: value,
  }));
