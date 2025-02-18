import { execa } from 'execa';
import { CliOptions } from 'src/types';

export const format = async (linter: CliOptions['linter']) => {
  const targetDir = process.env.TARGET_DIR!;

  if (linter !== 'none') {
    console.log('Formatting files...');
    await execa('npm', ['run', 'format'], { cwd: targetDir });
  }
};
