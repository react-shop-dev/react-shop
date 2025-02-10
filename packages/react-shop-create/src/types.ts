export type CliOptions = {
  linter?: 'eslint' | 'biome' | 'none';
  auth?: boolean;
  seed?: boolean;
  uiLib?: 'material' | 'tailwind' | 'none';
  description?: string;
};
