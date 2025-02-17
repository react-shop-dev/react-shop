import { execa } from 'execa';
import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import ora from 'ora';
import merge from 'deepmerge';
import { TEMPLATES } from 'src/constants';
import type { CliOptions } from 'src/types';

export const installDeps = async (settings: CliOptions, appDirName: string): Promise<void> => {
  const targetDir = process.env.TARGET_DIR!;

  const spinner = ora({
    color: 'cyan',
    text: 'Installing dependencies...',
  }).start();

  const starterJson = getPackageJsonTemplateFile(TEMPLATES.starter);
  const eslintPackageJson = getPackageJsonTemplateFile(
    settings.linter === 'eslint' ? TEMPLATES.eslint : undefined,
  );
  const biomePackageJson = getPackageJsonTemplateFile(
    settings.linter === 'biome' ? TEMPLATES.biome : undefined,
  );
  const authPackageJson = getPackageJsonTemplateFile(settings.auth ? TEMPLATES.auth : undefined);
  const fakePackageJson = getPackageJsonTemplateFile(settings.seed ? TEMPLATES.seed : undefined);

  const muiPackageJson = getPackageJsonTemplateFile(
    settings.uiLib === 'material' ? TEMPLATES.mui : undefined,
  );
  const tailwindPackageJson = getPackageJsonTemplateFile(
    settings.uiLib === 'tailwind' ? TEMPLATES.tailwind : undefined,
  );

  const file = merge.all([
    {
      name: appDirName,
      version: '0.1.0',
      description: settings.description,
      scripts: {
        dev: 'next dev --experimental-https',
        build: 'next build',
        start: 'next start',
        ...setLinterScript(settings.linter),
      },
    },
    starterJson,
    eslintPackageJson,
    biomePackageJson,
    authPackageJson,
    fakePackageJson,
    muiPackageJson,
    tailwindPackageJson,
  ]);

  const packageJson = await setVersionsOfPackages(file);

  fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(packageJson, null, 2));

  await execa('npm', ['install'], { cwd: targetDir });
  spinner.stop();
  console.log(chalk.green('Dependencies installed successfully'));
};

const getPackageJsonTemplateFile = (template?: string) => {
  if (!template) {
    return {};
  }

  const packageJsonPath = path.join(__dirname, '..', 'templates', template, 'package.json');

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = fs.readFileSync(packageJsonPath, 'utf-8');
    return JSON.parse(packageJson);
  }
  return {};
};

const setLinterScript = (linter: CliOptions['linter']) =>
  linter === 'eslint'
    ? {
        lint: 'next lint',
        format: 'prettier --write "src/**/*.{js,jsx,ts,tsx}"',
      }
    : linter === 'biome'
      ? {
          format: 'npx @biomejs/biome check --write',
        }
      : {};

const setVersionsOfPackages = async (packageJson: any) => {
  for (const [pkg, version] of Object.entries(packageJson.dependencies || {})) {
    if (version === 'latest') {
      try {
        const { stdout } = await execa('npm', ['show', pkg, 'version']);
        packageJson.dependencies[pkg] = `^${stdout.trim()}`;
        console.log(`\n ✔ Use ${pkg} ^${stdout.trim()}`);
      } catch (error) {
        console.warn(chalk.yellow(`⚠ Could not fetch version for ${pkg}`));
      }
    }
  }
  return packageJson;
};
