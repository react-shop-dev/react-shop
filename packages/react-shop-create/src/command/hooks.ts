import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { type Command } from 'commander';

export function hooks(program: Command) {
  program.hook('preAction', thisCommand => {
    const appDirName = thisCommand.args[0];
    const targetDir = path.resolve(process.cwd(), appDirName);
    if (fs.existsSync(targetDir)) {
      console.error(`Directory "${chalk.yellow(targetDir)}" already exists.`);
      process.exit(1);
    }
  });

  program.hook('postAction', thisCommand => {
    const appDirName = thisCommand.args[0];
    console.log(
      `\n🎉 ${chalk.green('Success!')} Your e-commerce app "${chalk.bold(appDirName)}" is ready.`,
    );
    console.log(`\nNavigate to your project: ${chalk.blueBright(`cd ${appDirName}`)}`);
    console.log(`Start the development server: ${chalk.blueBright('npm run dev')}`);
  });
}
