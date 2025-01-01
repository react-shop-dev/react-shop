import type { ProductCategory, Dictionary } from 'react-shop-types';
import type { StoreItemType } from '../types';
import { PRODUCT_TYPE } from '../constants';

type CategoriesMap = Dictionary<Omit<ProductCategory, 'id' | 'handle'> & { type?: StoreItemType }>;

export enum CatIds {
  'history' = 1,
  'arts',
  'fantasy',
  'science',
  'biography',
  'fiction',
  'romance',
  'education',
  'detective',
  'horror',
  'comics',
  'other',
  'accessories',
  'board-games',
  'toys',
}

export const categoriesMap: CategoriesMap = {
  [CatIds.history]: {
    name: 'History',
    is_active: true,
    description:
      'Explore the rich and diverse stories of our past, from ancient civilizations to modern times.',
    type: PRODUCT_TYPE.book,
    parent_category_id: null,
  },
  [CatIds.arts]: {
    name: 'Arts',
    is_active: true,
    description:
      'Dive into the world of creativity with books on visual arts, music, theater, and more.',
    type: PRODUCT_TYPE.book,
    parent_category_id: null,
  },
  [CatIds.fantasy]: {
    name: 'Fantasy',
    is_active: true,
    description:
      'Embark on epic adventures in magical realms filled with mythical creatures and heroic quests.',
    type: PRODUCT_TYPE.book,
    parent_category_id: null,
  },
  [CatIds.science]: {
    name: 'Science',
    is_active: true,
    description:
      'Discover the wonders of the universe and the latest breakthroughs in scientific knowledge.',
    type: PRODUCT_TYPE.book,
    parent_category_id: null,
  },
  [CatIds.biography]: {
    name: 'Biography',
    is_active: true,
    description:
      'Read the fascinating life stories of influential figures and ordinary people alike.',
    type: PRODUCT_TYPE.book,
    parent_category_id: null,
  },
  [CatIds.fiction]: {
    name: 'Fiction',
    is_active: true,
    description:
      'Get lost in captivating tales that explore the human experience through imaginative storytelling.',
    type: PRODUCT_TYPE.book,
    parent_category_id: null,
  },
  [CatIds.romance]: {
    name: 'Romance',
    is_active: true,
    description:
      'Fall in love with heartwarming and passionate stories that celebrate relationships and emotions.',
    type: PRODUCT_TYPE.book,
    parent_category_id: null,
  },
  [CatIds.education]: {
    name: 'Education',
    is_active: true,
    description:
      'Enhance your knowledge and skills with educational materials across various disciplines.',
    type: PRODUCT_TYPE.book,
    parent_category_id: null,
  },
  [CatIds.detective]: {
    name: 'Detective',
    is_active: true,
    description:
      'Solve thrilling mysteries and follow clever detectives as they uncover the truth.',
    type: PRODUCT_TYPE.book,
    parent_category_id: null,
  },
  [CatIds.horror]: {
    name: 'Horror',
    is_active: true,
    description:
      'Enter a world of spine-chilling tales that will keep you on the edge of your seat.',
    type: PRODUCT_TYPE.book,
    parent_category_id: null,
  },
  [CatIds.comics]: {
    name: 'Comics',
    is_active: true,
    description:
      'Dive into our vibrant collection of comics that bring stories to life through stunning visuals and captivating narratives. ',
    type: PRODUCT_TYPE.book,
    parent_category_id: null,
  },
  [CatIds.other]: {
    name: 'Other',
    parent_category_id: null,
    is_active: true,
    category_children_ids: [CatIds.accessories, CatIds['board-games'], CatIds.toys],
  },
  [CatIds.accessories]: {
    name: 'Accessories',
    is_active: true,
    description:
      'Complement your reading experience with a selection of stylish and practical accessories.',
    parent_category_id: CatIds.other,
    type: PRODUCT_TYPE.accessory,
  },
  [CatIds['board-games']]: {
    name: 'Board games',
    is_active: true,
    description:
      'Enjoy a wide range of board games that bring fun and challenge to your leisure time.',
    parent_category_id: CatIds.other,
    type: PRODUCT_TYPE.game,
  },
  [CatIds.toys]: {
    name: 'Toys',
    is_active: true,
    description:
      'Discover our exclusive collection of finely crafted figures, perfect for collectors and fans alike.',
    parent_category_id: CatIds.other,
    type: PRODUCT_TYPE.toys,
  },
};
