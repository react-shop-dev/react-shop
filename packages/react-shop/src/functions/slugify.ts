import capitalize from 'lodash/capitalize';

export const parseSlugifiedUrl = (input?: string, splitBy = '-') => {
  if (typeof input !== 'string') return '';
  return input
    .split(splitBy)
    .map(word => capitalize(word))
    .join(' ')
    .replace(/[^\w-]+/g, ' '); // Remove all non-word chars
};

export const slugify = (input?: string, replaceBy = '-') => {
  if (typeof input !== 'string') return;
  return input
    .trim()
    .replace(/\s+/g, replaceBy)
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();
};
