/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const componentsDir = './dist/lib';

function getAllComponents(dirPath) {
  const components = [];

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      components.push(...getAllComponents(fullPath));

      if (fs.existsSync(path.join(fullPath, 'index.mjs'))) {
        components.push({ name: entry.name, path: fullPath.split(path.sep).join(path.posix.sep) });
      }
    }
  }

  return components;
}

const allComponents = getAllComponents(componentsDir);

const moduleExports = {
  '.': {
    import: {
      types: './dist/index.d.mts',
      default: './dist/index.mjs',
    },
    require: {
      types: './dist/index.d.cts',
      default: './dist/index.cjs',
    },
  },
};

allComponents.forEach(component => {
  moduleExports[`./${component.name}`] = {
    import: {
      types: `./${component.path}/index.d.mts`,
      default: `./${component.path}/index.mjs`,
    },
    require: {
      types: `./${component.path}/index.d.cts`,
      default: `./${component.path}/index.d.cts`,
    },
  };
});

const packageJsonPath = './package.json';
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));
packageJson.exports = moduleExports;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
