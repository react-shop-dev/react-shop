import { Plugin } from 'esbuild';

export const muiIconsEsmReplace: Plugin = {
  name: 'muiIconsEsmReplace',
  setup: build => {
    if (build.initialOptions.format === 'esm') {
      build.onEnd(async args => {
        const muiIconsMaterialImportRegexp = /from\s?"@mui\/icons-material\/(\w*?)"/g;
        const muiIconsMaterialEsmImport = 'from "@mui/icons-material/esm/$1"';

        const jsOutputFiles =
          args.outputFiles?.filter(el => el.path.endsWith('.mjs') || el.path.endsWith('.js')) ?? [];

        for (const jsOutputFile of jsOutputFiles) {
          const str = new TextDecoder('utf-8').decode(jsOutputFile.contents);
          const newStr = str.replace(muiIconsMaterialImportRegexp, muiIconsMaterialEsmImport);
          jsOutputFile.contents = new TextEncoder().encode(newStr);
        }
      });
    }
  },
};
