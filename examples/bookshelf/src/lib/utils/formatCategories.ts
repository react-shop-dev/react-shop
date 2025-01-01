import type { ComponentType } from 'react';
import type { ProductCategory, Dictionary } from 'react-shop-types';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import GiftIcon from '@mui/icons-material/BookmarkBorder';
import CasinoIcon from '@mui/icons-material/CasinoOutlined';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import PaletteIcon from '@mui/icons-material/Palette';
import PolicyIcon from '@mui/icons-material/Policy';
import PsychologyIcon from '@mui/icons-material/Psychology';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import ScienceIcon from '@mui/icons-material/Science';
import StorefrontIcon from '@mui/icons-material/Storefront';
import TempleBuddhistIcon from '@mui/icons-material/TempleBuddhist';

export type CategoryWithChildren = Omit<
  ProductCategory,
  'handle' | 'parent_category_id' | 'category_children_ids'
> & {
  icon: ComponentType;
  href?: string;
  children?: CategoryWithChildren[];
};

export enum CategoryHandle {
  'history' = 'history',
  'arts' = 'arts',
  'fantasy' = 'fantasy',
  'science' = 'science',
  'biography' = 'biography',
  'fiction' = 'fiction',
  'romance' = 'romance',
  'education' = 'education',
  'detective' = 'detective',
  'horror' = 'horror',
  'comics' = 'comics',
  'accessories' = 'accessories',
  'board-games' = 'board-games',
  'toys' = 'toys',
}

const icons: { [key in CategoryHandle]: ComponentType } = {
  [CategoryHandle.history]: TempleBuddhistIcon,
  [CategoryHandle.arts]: PaletteIcon,
  [CategoryHandle.fantasy]: QueryBuilderIcon,
  [CategoryHandle.science]: ScienceIcon,
  [CategoryHandle.biography]: EmojiObjectsIcon,
  [CategoryHandle.fiction]: PsychologyIcon,
  [CategoryHandle.romance]: LocalFloristIcon,
  [CategoryHandle.education]: LibraryBooksIcon,
  [CategoryHandle.detective]: PolicyIcon,
  [CategoryHandle.horror]: AcUnitIcon,
  [CategoryHandle.comics]: StorefrontIcon,
  [CategoryHandle.accessories]: GiftIcon,
  [CategoryHandle['board-games']]: CasinoIcon,
  [CategoryHandle.toys]: FlutterDashIcon,
};

export const formatCategories = (categories: ProductCategory[] = []): CategoryWithChildren[] => {
  const categoryMap: Dictionary<CategoryWithChildren> = {};
  const topLevelCategories: CategoryWithChildren[] = [];

  // First pass: Create all categories and store in categoryMap
  categories.forEach(category => {
    const categoryWithChildren: CategoryWithChildren = {
      id: category.id,
      name: category.name,
      icon: icons[category.handle as keyof typeof icons],
      href: !category.category_children_ids?.length ? `/categories/${category.handle}` : undefined,
      children: [],
    };
    categoryMap[category.id] = categoryWithChildren;
  });

  // Second pass: Establish parent-child relationships
  categories.forEach(category => {
    if (category.parent_category_id) {
      const parent = categoryMap[String(category.parent_category_id)];
      if (parent) {
        parent.children?.push(categoryMap[category.id]);
      }
    } else {
      // If no parent, it's a top-level category
      topLevelCategories.push(categoryMap[category.id]);
    }
  });

  // Sort topLevelCategories: those with children should go last
  topLevelCategories.sort((a, b) => Number(a.children?.length) - Number(b.children?.length));

  return topLevelCategories;
};
