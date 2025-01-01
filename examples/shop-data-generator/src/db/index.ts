import history from './history.json';
import arts from './arts.json';
import fantasy from './fantasy.json';
import science from './science.json';
import romance from './romance.json';
import biography from './biography.json';
import fiction from './sciene_fiction.json';
import education from './education.json';
import detective from './detective.json';
import horror from './horror.json';
import comics from './comics.json';
import games from './board_games.json';
import accessories from './accessories.json';
import toys from './toys.json';
import type { StoreItemBase } from '../types';
import { CatIds } from './categories';

const allStoreItems = [
  { category_id: CatIds.history, data: history },
  { category_id: CatIds.arts, data: arts },
  { category_id: CatIds.fantasy, data: fantasy },
  { category_id: CatIds.science, data: science },
  { category_id: CatIds.biography, data: biography },
  { category_id: CatIds.fiction, data: fiction },
  { category_id: CatIds.romance, data: romance },
  { category_id: CatIds.education, data: education },
  { category_id: CatIds.detective, data: detective },
  { category_id: CatIds.horror, data: horror },
  { category_id: CatIds.comics, data: comics },
  { category_id: CatIds.other, data: [] },
  { category_id: CatIds.accessories, data: accessories },
  { category_id: CatIds['board-games'], data: games },
  { category_id: CatIds.toys, data: toys },
];

export default allStoreItems.flatMap(({ category_id, data }) =>
  data.map(item => ({
    ...item,
    category_id,
  })),
) as StoreItemBase[];
