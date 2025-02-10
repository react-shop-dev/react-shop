import Handlebars from 'handlebars';
import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import type { CliOptions } from 'src/types';

function generateFile(fileName: string, destination: string, params = {}, extension = 'tsx') {
  const targetDir = process.env.TARGET_DIR!;
  const filePath = path.resolve(__dirname, '..', 'templates', 'generator', `${fileName}.hbs`);
  const content = fs.readFileSync(filePath);

  Handlebars.registerHelper('useMaterial', string => string === 'material');

  Handlebars.registerHelper('useTailwind', string => string === 'tailwind');

  const template = Handlebars.compile(content.toString());
  fs.writeFileSync(path.join(targetDir, destination, `${fileName}.${extension}`), template(params));
}

export const complileFiles = (config: CliOptions) => {
  console.log('Compiling files...');

  const { auth, seed, uiLib } = config;

  const useStoreFront = seed || uiLib === 'material';

  generateFile('layout', 'src/app', {
    useStoreFront,
    auth,
    uiLib,
  });

  if (useStoreFront) {
    generateFile('StoreFront', 'src/modules/store', {
      seed,
      uiLib,
    });
  }

  console.log(chalk.green('Files compiled successfully'));
};
