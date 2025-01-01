import { atom } from './atom';
import { atomWithStorage } from './persist';
import { LOCAL_STORAGE_KEY } from 'src/constants';
import { ViewMode } from '@type/lib';

export const authPopupState = atom<boolean>(false);

export const drawerState = atom<boolean>(false);

export const cartOpenState = atom<boolean>(false);

export const viewModeState = atomWithStorage<ViewMode>(
  `${LOCAL_STORAGE_KEY}:viewMode`,
  ViewMode.grid,
);

export const listParamsState = (key: string | false) =>
  atomWithStorage(`${LOCAL_STORAGE_KEY}${key ? `:${key}` : ''}`, {});

export const afterLoginPathnameState = atom<string | null>(null);
